export interface DeviceTier {
  tier: 'high' | 'mid' | 'low';
  maxParticles: number;
  usePostProcessing: boolean;
  shadowsEnabled: boolean;
  pixelRatio: number;
}

export function detectDeviceTier(): DeviceTier {
  if (typeof window === 'undefined') {
    return {
      tier: 'mid',
      maxParticles: 1500,
      usePostProcessing: false,
      shadowsEnabled: false,
      pixelRatio: 1.5,
    };
  }

  const isMobile = window.innerWidth < 768;
  if (isMobile) {
    return {
      tier: 'low',
      maxParticles: 10,
      usePostProcessing: false,
      shadowsEnabled: false,
      pixelRatio: 0.75,
    };
  }

  const memory = (navigator as Navigator & { deviceMemory?: number })
    .deviceMemory || 4;
  const cores = navigator.hardwareConcurrency || 4;

  let gpuTier: 'high' | 'mid' | 'low' = 'mid';

  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

    if (gl) {
      const debugInfo = (gl as WebGLRenderingContext).getExtension('WEBGL_debug_renderer_info');
      if (debugInfo) {
        const renderer = (gl as WebGLRenderingContext).getParameter(
          debugInfo.UNMASKED_RENDERER_WEBGL
        );
        const rendererStr = String(renderer).toLowerCase();

        if (
          rendererStr.includes('nvidia') ||
          rendererStr.includes('amd') ||
          rendererStr.includes('radeon') ||
          rendererStr.includes('geforce')
        ) {
          gpuTier = 'high';
        } else if (
          rendererStr.includes('intel') ||
          rendererStr.includes('iris') ||
          rendererStr.includes('uhd')
        ) {
          gpuTier = 'mid';
        } else {
          gpuTier = 'low';
        }
      }
    }
  } catch (e) {
    gpuTier = 'mid';
  }

  if (memory >= 8 && cores >= 8 && gpuTier === 'high') {
    return {
      tier: 'high',
      maxParticles: 100,
      usePostProcessing: false,
      shadowsEnabled: false,
      pixelRatio: 1,
    };
  }

  if (memory >= 4 && cores >= 4 && (gpuTier === 'high' || gpuTier === 'mid')) {
    return {
      tier: 'mid',
      maxParticles: 50,
      usePostProcessing: false,
      shadowsEnabled: false,
      pixelRatio: 1,
    };
  }

  return {
    tier: 'low',
    maxParticles: 25,
    usePostProcessing: false,
    shadowsEnabled: false,
    pixelRatio: 1,
  };
}
