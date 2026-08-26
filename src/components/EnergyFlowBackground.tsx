import React, { useEffect, useRef } from 'react';

export const EnergyFlowBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') as WebGLRenderingContext | null;
    if (!gl) {
      console.warn('WebGL not supported, falling back to static background.');
      return;
    }

    // Vertex Shader code - covers screen space
    const vsSource = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    // Fragment Shader code - procedural simplex noise flow field
    const fsSource = `
      precision mediump float;
      uniform vec2 u_resolution;
      uniform float u_time;

      // Classic 2D Simplex Noise by Stefan Gustavson
      vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

      float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                 -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy) );
        vec2 x0 = v -   i + dot(i, C.xx) ;
        vec2 i1;
        i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod(i, 289.0);
        vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
        + i.x + vec3(0.0, i1.x, 1.0 ));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
          dot(x12.zw,x12.zw)), 0.0);
        m = m*m ;
        m = m*m ;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 a0 = x - floor(x + 0.5);
        vec3 g0 = a0*vec3(x0.x,x12.x,x12.z) + h*vec3(x0.y,x12.y,x12.w);
        vec3 m1 = m * g0;
        return 130.0 * dot(m1, m1);
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        
        // Correct aspect ratio so waves stay round/fluid
        float aspect = u_resolution.x / u_resolution.y;
        vec2 st = uv - 0.5;
        st.x *= aspect;

        // Flow movement speed and scaling
        float time = u_time * 0.08;
        
        // Compute multi-layered flow field
        vec2 flowDir1 = vec2(st.x + time * 0.5, st.y - time * 0.3);
        vec2 flowDir2 = vec2(st.x - time * 0.4, st.y + time * 0.6);
        
        float n1 = snoise(flowDir1 * 1.8) * 0.5;
        float n2 = snoise(flowDir2 * 3.2 + vec2(n1, -n1)) * 0.25;
        float n3 = snoise((st + vec2(n2, n1)) * 6.0) * 0.125;
        
        float intensity = n1 + n2 + n3;
        
        // Map noise range to [0, 1]
        intensity = (intensity + 0.875) / 1.75;
        
        // Mask vignette glow: stronger energy flowing near centers & sides
        float centerGlow = 1.0 - length(st * 0.4);
        intensity *= max(centerGlow, 0.0);

        // Theme Brand Colors:
        // Burnt Orange: vec3(0.827, 0.329, 0.0) // #D35400
        // Amber: vec3(0.953, 0.612, 0.071)      // #F39C12
        vec3 burntOrange = vec3(0.827, 0.329, 0.0);
        vec3 amber = vec3(0.953, 0.612, 0.071);
        
        // Mix brand colors based on flow density
        vec3 flowColor = mix(burntOrange, amber, intensity);
        
        // Soft Cream background base: #F5E7D0 -> vec3(0.961, 0.906, 0.816)
        vec3 bgCream = vec3(0.961, 0.906, 0.816);
        
        // Blend flowing colors with a low blendFactor (max 10% opacity) for high readability
        float blendFactor = intensity * 0.10;
        vec3 finalColor = mix(bgCream, flowColor, blendFactor);
        
        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    // Helper to compile shaders
    function compileShader(source: string, type: number): WebGLShader | null {
      const shader = gl!.createShader(type);
      if (!shader) return null;
      gl!.shaderSource(shader, source);
      gl!.compileShader(shader);
      if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl!.getShaderInfoLog(shader));
        gl!.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vs = compileShader(vsSource, gl.VERTEX_SHADER);
    const fs = compileShader(fsSource, gl.FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Shader program link error:', gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Quad geometry covering full canvas coordinates
    const vertices = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ]);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const positionLoc = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    const resolutionLoc = gl.getUniformLocation(program, 'u_resolution');
    const timeLoc = gl.getUniformLocation(program, 'u_time');

    // Handle high-dpi canvas sizing
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = Math.min(window.innerWidth * dpr, 2048);
      const height = Math.min(window.innerHeight * dpr, 2048);
      
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
    };

    window.addEventListener('resize', resize);
    resize();

    let animationFrameId: number;
    const startTime = performance.now();

    const render = () => {
      const elapsed = (performance.now() - startTime) / 1000;
      
      gl.uniform2f(resolutionLoc, canvas.width, canvas.height);
      gl.uniform1f(timeLoc, elapsed);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Clean up resources on component unmount
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none',
        display: 'block',
      }}
    />
  );
};
