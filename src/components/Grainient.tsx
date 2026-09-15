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

const vertex = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragment = `#version 300 es
precision highp float;
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
out vec4 fragColor;
float safeSmoothstep(float a, float b, float t) {
  if (a > b) return 1.0 - smoothstep(b, a, t);
  return smoothstep(a, b, t);
}
#define S(a,b,t) safeSmoothstep(a,b,t)
mat2 Rot(float a){float s=sin(a),c=cos(a);return mat2(c,-s,s,c);} 
vec2 hash(vec2 p){p=vec2(dot(p,vec2(2127.1,81.17)),dot(p,vec2(1269.5,283.37)));return fract(sin(p)*43758.5453);} 
float noise(vec2 p){vec2 i=floor(p),f=fract(p),u=f*f*(3.0-2.0*f);float n=mix(mix(dot(-1.0+2.0*hash(i+vec2(0.0,0.0)),f-vec2(0.0,0.0)),dot(-1.0+2.0*hash(i+vec2(1.0,0.0)),f-vec2(1.0,0.0)),u.x),mix(dot(-1.0+2.0*hash(i+vec2(0.0,1.0)),f-vec2(0.0,1.0)),dot(-1.0+2.0*hash(i+vec2(1.0,1.0)),f-vec2(1.0,1.0)),u.x),u.y);return 0.5+0.5*n;}\nvoid mainImage(out vec4 o, vec2 C){\n  float t=iTime*uTimeSpeed;\n  vec2 uv=C/iResolution.xy;\n  float ratio=iResolution.x/iResolution.y;\n  vec2 tuv=uv-0.5+uCenterOffset;\n  tuv/=max(uZoom,0.001);\n\n  float degree=noise(vec2(t*0.1,tuv.x*tuv.y)*uNoiseScale);\n  tuv.y*=1.0/ratio;\n  tuv*=Rot(radians((degree-0.5)*uRotationAmount+180.0));\n  tuv.y*=ratio;\n\n  float frequency=uWarpFrequency;\n  float ws=max(uWarpStrength,0.001);\n  float amplitude=uWarpAmplitude/ws;\n  float warpTime=t*uWarpSpeed;\n  tuv.x+=sin(tuv.y*frequency+warpTime)/amplitude;\n  tuv.y+=sin(tuv.x*(frequency*1.5)+warpTime)/(amplitude*0.5);\n\n  vec3 colLav=uColor1;\n  vec3 colOrg=uColor2;\n  vec3 colDark=uColor3;\n  float b=uColorBalance;\n  float s=max(uBlendSoftness,0.0);\n  mat2 blendRot=Rot(radians(uBlendAngle));\n  float blendX=(tuv*blendRot).x;\n  float edge0=-0.3-b-s;\n  float edge1=0.2-b+s;\n  float v0=0.5-b+s;\n  float v1=-0.3-b-s;\n  vec3 layer1=mix(colDark,colOrg,S(edge0,edge1,blendX));\n  vec3 layer2=mix(colOrg,colLav,S(edge0,edge1,blendX));\n  vec3 col=mix(layer1,layer2,S(v0,v1,tuv.y));\n\n  vec2 grainUv=uv*max(uGrainScale,0.001);\n  if(uGrainAnimated>0.5){grainUv+=vec2(iTime*0.05);} \n  float grain=fract(sin(dot(grainUv,vec2(12.9898,78.233)))*43758.5453);\n  col+=(grain-0.5)*uGrainAmount;\n\n  col=(col-0.5)*uContrast+0.5;\n  float luma=dot(col,vec3(0.2126,0.7152,0.0722));\n  col=mix(vec3(luma),col,uSaturation);\n  col=pow(max(col,0.0),vec3(1.0/max(uGamma,0.001)));\n  col=clamp(col,0.0,1.0);\n  if(uLightMode>0.5){\n    float energy=max(max(col.r,col.g),col.b);\n    vec3 hue=col/max(energy,0.001);\n    float chroma=length(col-vec3(dot(col,vec3(0.333333))));\n    float coverage=clamp(0.12+chroma*1.15+energy*0.18,0.0,0.88);\n    col=mix(vec3(1.0),clamp(hue*0.58+col*0.18,0.0,1.0),coverage);\n  }\n\n  o=vec4(col,1.0);\n}\nvoid main(){\n  vec4 o=vec4(0.0);\n  mainImage(o,gl_FragCoord.xy);\n  fragColor=o;\n}\n`;

// Keep renderer/program alive across re-renders so Effect 2 can update
// uniforms without ever rebuilding the WebGL context.
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

  // Effect 1: build WebGL context once, pause when offscreen / tab hidden
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new Renderer({
      webgl: 2,
      alpha: true,
      antialias: false,
      dpr: Math.min(typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1, 2)
    });

    const gl = renderer.gl;
    if (!gl) return;

    const canvas = gl.canvas as HTMLCanvasElement;
    canvas.style.position = 'absolute';
    canvas.style.inset = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    canvas.style.pointerEvents = 'none';
    container.appendChild(canvas);

    const handleContextLost = (e: Event) => {
      e.preventDefault();
      tryStop();
    };
    canvas.addEventListener('webglcontextlost', handleContextLost, false);

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        iTime:           { value: 0 },
        iResolution:     { value: new Float32Array([1, 1]) },
        uTimeSpeed:      { value: 0.25 },
        uColorBalance:   { value: 0.0 },
        uWarpStrength:   { value: 1.0 },
        uWarpFrequency:  { value: 5.0 },
        uWarpSpeed:      { value: 2.0 },
        uWarpAmplitude:  { value: 50.0 },
        uBlendAngle:     { value: 0.0 },
        uBlendSoftness:  { value: 0.05 },
        uRotationAmount: { value: 500.0 },
        uNoiseScale:     { value: 2.0 },
        uGrainAmount:    { value: 0.1 },
        uGrainScale:     { value: 2.0 },
        uGrainAnimated:  { value: 0.0 },
        uContrast:       { value: 1.5 },
        uGamma:          { value: 1.0 },
        uSaturation:     { value: 1.0 },
        uCenterOffset:   { value: new Float32Array([0, 0]) },
        uZoom:           { value: 0.9 },
        uColor1:         { value: new Float32Array([1, 1, 1]) },
        uColor2:         { value: new Float32Array([1, 1, 1]) },
        uColor3:         { value: new Float32Array([1, 1, 1]) },
        uLightMode:      { value: 0.0 }
      }
    });

    const mesh = new Mesh(gl, { geometry, program });
    ctxMap.set(container, { renderer, program, mesh });

    const setSize = () => {
      const rect = container.getBoundingClientRect();
      const w = Math.max(1, Math.floor(rect.width || window.innerWidth));
      const h = Math.max(1, Math.floor(rect.height || window.innerHeight));
      renderer.setSize(w, h);
      const res = (program.uniforms.iResolution as { value: Float32Array }).value;
      res[0] = gl.drawingBufferWidth;
      res[1] = gl.drawingBufferHeight;
      renderer.render({ scene: mesh });
    };

    const ro = new ResizeObserver(setSize);
    ro.observe(container);
    window.addEventListener('resize', setSize);
    window.addEventListener('orientationchange', setSize);
    setSize();

    let raf = 0;
    let isPageVisible = !document.hidden;
    const t0 = performance.now();

    const loop = (t: number) => {
      (program.uniforms.iTime as { value: number }).value = (t - t0) * 0.001;
      renderer.render({ scene: mesh });
      raf = requestAnimationFrame(loop);
    };

    const tryStart = () => {
      if (isPageVisible && raf === 0) raf = requestAnimationFrame(loop);
    };
    const tryStop = () => {
      if (raf !== 0) { cancelAnimationFrame(raf); raf = 0; }
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

    tryStart();

    return () => {
      tryStop();
      ro.disconnect();
      window.removeEventListener('resize', setSize);
      window.removeEventListener('orientationchange', setSize);
      document.removeEventListener('visibilitychange', onVisibility);
      canvas.removeEventListener('webglcontextlost', handleContextLost);
      ctxMap.delete(container);
      try { container.removeChild(canvas); } catch { /* ignore */ }
    };
  }, []); // renderer created once

  // Effect 2: sync props to uniforms — zero GPU cost, no teardown
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const ctx = ctxMap.get(container);
    if (!ctx) return;
    const { program } = ctx;
    const u = program.uniforms as Record<string, { value: any }>;

    u.uTimeSpeed.value      = timeSpeed;
    u.uColorBalance.value   = colorBalance;
    u.uWarpStrength.value   = warpStrength;
    u.uWarpFrequency.value  = warpFrequency;
    u.uWarpSpeed.value      = warpSpeed;
    u.uWarpAmplitude.value  = warpAmplitude;
    u.uBlendAngle.value     = blendAngle;
    u.uBlendSoftness.value  = blendSoftness;
    u.uRotationAmount.value = rotationAmount;
    u.uNoiseScale.value     = noiseScale;
    u.uGrainAmount.value    = grainAmount;
    u.uGrainScale.value     = grainScale;
    u.uGrainAnimated.value  = grainAnimated ? 1.0 : 0.0;
    u.uContrast.value       = contrast;
    u.uGamma.value          = gamma;
    u.uSaturation.value     = saturation;
    u.uCenterOffset.value   = new Float32Array([centerX, centerY]);
    u.uZoom.value           = zoom;
    u.uColor1.value         = new Float32Array(hexToRgb(color1));
    u.uColor2.value         = new Float32Array(hexToRgb(color2));
    u.uColor3.value         = new Float32Array(hexToRgb(color3));
    u.uLightMode.value      = lightMode ? 1.0 : 0.0;
  }, [
    timeSpeed, colorBalance, warpStrength, warpFrequency, warpSpeed,
    warpAmplitude, blendAngle, blendSoftness, rotationAmount, noiseScale,
    grainAmount, grainScale, grainAnimated, contrast, gamma, saturation,
    centerX, centerY, zoom, color1, color2, color3, lightMode
  ]);

  return <div ref={containerRef} className={`grainient-container ${className}`.trim()} />;
};

export default Grainient;
