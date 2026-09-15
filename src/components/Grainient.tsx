import React, { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Triangle } from 'ogl';
import './Grainient.css';

export interface GrainientProps {
  timeSpeed?: number;
  colorBalance?: number;
  warpStrength?: number;
  warpFrequency?: number;
  warpSpeed?: number;
  warpAmplitude?: number;
  blendAngle?: number;
  blendSoftness?: number;
  rotationAmount?: number;
  noiseScale?: number;
  grainAmount?: number;
  grainScale?: number;
  grainAnimated?: boolean;
  contrast?: number;
  gamma?: number;
  saturation?: number;
  centerX?: number;
  centerY?: number;
  zoom?: number;
  color1?: string;
  color2?: string;
  color3?: string;
  lightMode?: boolean;
  className?: string;
}

const hexToRgb = (hex: string): [number, number, number] => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return [1, 1, 1];
  return [parseInt(result[1], 16) / 255, parseInt(result[2], 16) / 255, parseInt(result[3], 16) / 255];
};

const vertex300 = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;
const vertex100 = `attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;
const sharedUniforms = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec2 iResolution;
uniform float iTime;
uniform float uTimeSpeed;
uniform float uColorBalance;
uniform float uWarpStrength;
uniform float uWarpFrequency;
uniform float uWarpSpeed;
uniform float uWarpAmplitude;
uniform float uBlendAngle;
uniform float uBlendSoftness;
uniform float uRotationAmount;
uniform float uNoiseScale;
uniform float uGrainAmount;
uniform float uGrainScale;
uniform float uGrainAnimated;
uniform float uContrast;
uniform float uGamma;
uniform float uSaturation;
uniform vec2 uCenterOffset;
uniform float uZoom;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform float uLightMode;
;

`;
const sharedBody = `
float safeSmoothstep(float a, float b, float t) {
  if (a > b) return 1.0 - smoothstep(b, a, t);
  return smoothstep(a, b, t);
}
#define S(a,b,t) safeSmoothstep(a,b,t)
mat2 Rot(float a){float s=sin(a),c=cos(a);return mat2(c,-s,s,c);} 
vec2 hash(vec2 p){p=vec2(dot(p,vec2(2127.1,81.17)),dot(p,vec2(1269.5,283.37)));return fract(sin(p)*43758.5453);} 
float noise(vec2 p){vec2 i=floor(p),f=fract(p),u=f*f*(3.0-2.0*f);float n=mix(mix(dot(-1.0+2.0*hash(i+vec2(0.0,0.0)),f-vec2(0.0,0.0)),dot(-1.0+2.0*hash(i+vec2(1.0,0.0)),f-vec2(1.0,0.0)),u.x),mix(dot(-1.0+2.0*hash(i+vec2(0.0,1.0)),f-vec2(0.0,1.0)),dot(-1.0+2.0*hash(i+vec2(1.0,1.0)),f-vec2(1.0,1.0)),u.x),u.y);return 0.5+0.5*n;}

void mainImage(out vec4 o, vec2 C){
  float t=iTime*uTimeSpeed;
  vec2 uv=C/iResolution.xy;
  float ratio=iResolution.x/iResolution.y;
  vec2 tuv=uv-0.5+uCenterOffset;
  tuv/=max(uZoom,0.001);

  float degree=noise(vec2(t*0.1,tuv.x*tuv.y)*uNoiseScale);
  tuv.y*=1.0/ratio;
  tuv*=Rot(radians((degree-0.5)*uRotationAmount+180.0));
  tuv.y*=ratio;

  float frequency=uWarpFrequency;
  float ws=max(uWarpStrength,0.001);
  float amplitude=uWarpAmplitude/ws;
  float warpTime=t*uWarpSpeed;
  tuv.x+=sin(tuv.y*frequency+warpTime)/amplitude;
  tuv.y+=sin(tuv.x*(frequency*1.5)+warpTime)/(amplitude*0.5);

  vec3 colLav=uColor1;
  vec3 colOrg=uColor2;
  vec3 colDark=uColor3;
  float b=uColorBalance;
  float s=max(uBlendSoftness,0.0);
  mat2 blendRot=Rot(radians(uBlendAngle));
  float blendX=(tuv*blendRot).x;
  float edge0=-0.3-b-s;
  float edge1=0.2-b+s;
  float v0=0.5-b+s;
  float v1=-0.3-b-s;
  vec3 layer1=mix(colDark,colOrg,S(edge0,edge1,blendX));
  vec3 layer2=mix(colOrg,colLav,S(edge0,edge1,blendX));
  vec3 col=mix(layer1,layer2,S(v0,v1,tuv.y));

  vec2 grainUv=uv*max(uGrainScale,0.001);
  if(uGrainAnimated>0.5){grainUv+=vec2(iTime*0.05);} 
  float grain=fract(sin(dot(grainUv,vec2(12.9898,78.233)))*43758.5453);
  col+=(grain-0.5)*uGrainAmount;

  col=(col-0.5)*uContrast+0.5;
  float luma=dot(col,vec3(0.2126,0.7152,0.0722));
  col=mix(vec3(luma),col,uSaturation);
  col=pow(max(col,0.0),vec3(1.0/max(uGamma,0.001)));
  col=clamp(col,0.0,1.0);
  if(uLightMode>0.5){
    float energy=max(max(col.r,col.g),col.b);
    vec3 hue=col/max(energy,0.001);
    float chroma=length(col-vec3(dot(col,vec3(0.333333))));
    float coverage=clamp(0.12+chroma*1.15+energy*0.18,0.0,0.88);
    col=mix(vec3(1.0),clamp(hue*0.58+col*0.18,0.0,1.0),coverage);
  }

  o=vec4(col,1.0);
}
;

`;
const fragment300 = `#version 300 es\n` + sharedUniforms + `out vec4 fragColor;\n` + sharedBody + `\nvoid main(){\n  vec4 o=vec4(0.0);\n  mainImage(o,gl_FragCoord.xy);\n  fragColor=o;\n}\n`;
const fragment100 = sharedUniforms + sharedBody + `\nvoid main(){\n  vec4 o=vec4(0.0);\n  mainImage(o,gl_FragCoord.xy);\n  gl_FragColor=o;\n}\n`;
type GrainientCtx = {
  renderer: InstanceType<typeof Renderer>;
  program: InstanceType<typeof Program>;
  mesh: InstanceType<typeof Mesh>;
};
const ctxMap = new WeakMap<HTMLDivElement, GrainientCtx>();

export const Grainient: React.FC<GrainientProps> = ({
  timeSpeed = 0.25,
  colorBalance = 0.0,
  warpStrength = 1.0,
  warpFrequency = 5.0,
  warpSpeed = 2.0,
  warpAmplitude = 50.0,
  blendAngle = 0.0,
  blendSoftness = 0.05,
  rotationAmount = 500.0,
  noiseScale = 2.0,
  grainAmount = 0.1,
  grainScale = 2.0,
  grainAnimated = false,
  contrast = 1.5,
  gamma = 1.0,
  saturation = 1.0,
  centerX = 0.0,
  centerY = 0.0,
  zoom = 0.9,
  color1 = '#FF9FFC',
  color2 = '#5227FF',
  color3 = '#B497CF',
  lightMode = false,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const propsRef = useRef({
    timeSpeed, colorBalance, warpStrength, warpFrequency, warpSpeed,
    warpAmplitude, blendAngle, blendSoftness, rotationAmount, noiseScale,
    grainAmount, grainScale, grainAnimated, contrast, gamma, saturation,
    centerX, centerY, zoom, color1, color2, color3, lightMode
  });


  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: InstanceType<typeof Renderer> | null = null;
    let gl: InstanceType<typeof Renderer>['gl'] | null = null;
    let program: InstanceType<typeof Program> | null = null;
    let geometry: InstanceType<typeof Triangle> | null = null;
    let mesh: InstanceType<typeof Mesh> | null = null;
    let isContextLost = false;
    let raf = 0;
    let isPageVisible = !document.hidden;
    const t0 = performance.now();

    const safeDpr = Math.min(typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1, 2);

    try {
      renderer = new Renderer({
        webgl: 2,
        alpha: true,
        antialias: false,
        dpr: safeDpr
      });
      gl = renderer.gl;
    } catch {
      try {
        renderer = new Renderer({
          webgl: 1,
          alpha: true,
          antialias: false,
          dpr: safeDpr
        });
        gl = renderer.gl;
      } catch (err2) {
        console.warn('WebGL context creation failed on device:', err2);
        return;
      }
    }

    if (!renderer || !gl) {
      console.warn('WebGL not available on this device');
      return;
    }

    const canvas = gl.canvas as HTMLCanvasElement;
    canvas.style.position = 'absolute';
    canvas.style.inset = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    canvas.style.pointerEvents = 'none';
    container.appendChild(canvas);

    const isWebgl2 = Boolean((renderer as any).isWebgl2);
    const activeVertex = isWebgl2 ? vertex300 : vertex100;
    const activeFragment = isWebgl2 ? fragment300 : fragment100;

    const createResources = () => {
      if (!gl) return;
      geometry = new Triangle(gl);
      program = new Program(gl, {
        vertex: activeVertex,
        fragment: activeFragment,
        uniforms: {
          iTime:           { value: 0 },
          iResolution:     { value: new Float32Array([1, 1]) },
          uTimeSpeed:      { value: propsRef.current.timeSpeed },
          uColorBalance:   { value: propsRef.current.colorBalance },
          uWarpStrength:   { value: propsRef.current.warpStrength },
          uWarpFrequency:  { value: propsRef.current.warpFrequency },
          uWarpSpeed:      { value: propsRef.current.warpSpeed },
          uWarpAmplitude:  { value: propsRef.current.warpAmplitude },
          uBlendAngle:     { value: propsRef.current.blendAngle },
          uBlendSoftness:  { value: propsRef.current.blendSoftness },
          uRotationAmount: { value: propsRef.current.rotationAmount },
          uNoiseScale:     { value: propsRef.current.noiseScale },
          uGrainAmount:    { value: propsRef.current.grainAmount },
          uGrainScale:     { value: propsRef.current.grainScale },
          uGrainAnimated:  { value: propsRef.current.grainAnimated ? 1.0 : 0.0 },
          uContrast:       { value: propsRef.current.contrast },
          uGamma:          { value: propsRef.current.gamma },
          uSaturation:     { value: propsRef.current.saturation },
          uCenterOffset:   { value: new Float32Array([propsRef.current.centerX, propsRef.current.centerY]) },
          uZoom:           { value: propsRef.current.zoom },
          uColor1:         { value: new Float32Array(hexToRgb(propsRef.current.color1)) },
          uColor2:         { value: new Float32Array(hexToRgb(propsRef.current.color2)) },
          uColor3:         { value: new Float32Array(hexToRgb(propsRef.current.color3)) },
          uLightMode:      { value: propsRef.current.lightMode ? 1.0 : 0.0 }
        }
      });
      mesh = new Mesh(gl, { geometry, program });
      ctxMap.set(container, { renderer: renderer!, program, mesh });
    };

    createResources();

    const setSize = () => {
      if (!renderer || !gl || !program || !mesh || isContextLost) return;
      const rect = container.getBoundingClientRect();
      const w = Math.floor(rect.width || window.innerWidth || 0);
      const h = Math.floor(rect.height || window.innerHeight || 0);
      if (w <= 0 || h <= 0) return;

      renderer.setSize(w, h);
      const res = (program.uniforms.iResolution as { value: Float32Array })?.value;
      if (res) {
        res[0] = gl.drawingBufferWidth;
        res[1] = gl.drawingBufferHeight;
      }
      try {
        renderer.render({ scene: mesh });
      } catch {
        // Safe guard against mid-render context loss
      }
    };

    const handleContextCreationError = (e: Event) => {
      console.warn('WebGL context creation error:', (e as any)?.statusMessage || e);
    };

    const handleContextLost = (e: Event) => {
      e.preventDefault();
      isContextLost = true;
      tryStop();
    };

    const handleContextRestored = () => {
      isContextLost = false;
      createResources();
      setSize();
      tryStart();
    };

    canvas.addEventListener('webglcontextcreationerror', handleContextCreationError);
    canvas.addEventListener('webglcontextlost', handleContextLost, false);
    canvas.addEventListener('webglcontextrestored', handleContextRestored, false);

    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width > 0 && entry.contentRect.height > 0) {
          setSize();
          if (raf === 0) tryStart();
        }
      }
    });
    ro.observe(container);
    window.addEventListener('resize', setSize);
    window.addEventListener('orientationchange', setSize);

    const loop = (t: number) => {
      if (isContextLost || !program || !renderer || !mesh) return;
      try {
        (program.uniforms.iTime as { value: number }).value = (t - t0) * 0.001;
        renderer.render({ scene: mesh });
      } catch {
        // Suppress GPU hiccups
      }
      raf = requestAnimationFrame(loop);
    };

    const tryStart = () => {
      if (!isContextLost && isPageVisible && raf === 0) {
        raf = requestAnimationFrame(loop);
      }
    };

    const tryStop = () => {
      if (raf !== 0) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    const onVisibility = () => {
      isPageVisible = !document.hidden;
      if (isPageVisible) {
        tryStart();
      } else {
        tryStop();
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    setSize();
    tryStart();

    return () => {
      tryStop();
      ro.disconnect();
      window.removeEventListener('resize', setSize);
      window.removeEventListener('orientationchange', setSize);
      document.removeEventListener('visibilitychange', onVisibility);
      canvas.removeEventListener('webglcontextcreationerror', handleContextCreationError);
      canvas.removeEventListener('webglcontextlost', handleContextLost);
      canvas.removeEventListener('webglcontextrestored', handleContextRestored);
      ctxMap.delete(container);
      try { container.removeChild(canvas); } catch { /* ignore */ }
    };
  }, []);

  // Effect 2: sync props to uniforms — zero GPU cost, no teardown
  useEffect(() => {
    propsRef.current = {
      timeSpeed, colorBalance, warpStrength, warpFrequency, warpSpeed,
      warpAmplitude, blendAngle, blendSoftness, rotationAmount, noiseScale,
      grainAmount, grainScale, grainAnimated, contrast, gamma, saturation,
      centerX, centerY, zoom, color1, color2, color3, lightMode
    };

    const container = containerRef.current;
    if (!container) return;
    const ctx = ctxMap.get(container);
    if (!ctx) return;
    const { program } = ctx;
    if (!program || !program.uniforms) return;
    const u = program.uniforms as Record<string, { value: any }>;

    if (u.uTimeSpeed) u.uTimeSpeed.value      = timeSpeed;
    if (u.uColorBalance) u.uColorBalance.value   = colorBalance;
    if (u.uWarpStrength) u.uWarpStrength.value   = warpStrength;
    if (u.uWarpFrequency) u.uWarpFrequency.value  = warpFrequency;
    if (u.uWarpSpeed) u.uWarpSpeed.value      = warpSpeed;
    if (u.uWarpAmplitude) u.uWarpAmplitude.value  = warpAmplitude;
    if (u.uBlendAngle) u.uBlendAngle.value     = blendAngle;
    if (u.uBlendSoftness) u.uBlendSoftness.value  = blendSoftness;
    if (u.uRotationAmount) u.uRotationAmount.value = rotationAmount;
    if (u.uNoiseScale) u.uNoiseScale.value     = noiseScale;
    if (u.uGrainAmount) u.uGrainAmount.value    = grainAmount;
    if (u.uGrainScale) u.uGrainScale.value     = grainScale;
    if (u.uGrainAnimated) u.uGrainAnimated.value  = grainAnimated ? 1.0 : 0.0;
    if (u.uContrast) u.uContrast.value       = contrast;
    if (u.uGamma) u.uGamma.value          = gamma;
    if (u.uSaturation) u.uSaturation.value     = saturation;
    if (u.uCenterOffset) u.uCenterOffset.value   = new Float32Array([centerX, centerY]);
    if (u.uZoom) u.uZoom.value           = zoom;
    if (u.uColor1) u.uColor1.value         = new Float32Array(hexToRgb(color1));
    if (u.uColor2) u.uColor2.value         = new Float32Array(hexToRgb(color2));
    if (u.uColor3) u.uColor3.value         = new Float32Array(hexToRgb(color3));
    if (u.uLightMode) u.uLightMode.value      = lightMode ? 1.0 : 0.0;
  }, [
    timeSpeed, colorBalance, warpStrength, warpFrequency, warpSpeed,
    warpAmplitude, blendAngle, blendSoftness, rotationAmount, noiseScale,
    grainAmount, grainScale, grainAnimated, contrast, gamma, saturation,
    centerX, centerY, zoom, color1, color2, color3, lightMode
  ]);

  return <div ref={containerRef} className={('grainient-container ' + className).trim()} />;
};

export default Grainient;
