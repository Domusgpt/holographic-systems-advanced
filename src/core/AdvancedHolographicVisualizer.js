/**
 * Advanced Holographic Visualizer - 10-Layer Multi-Geometry System
 * Features 10 rendering layers with multiple geometries per layer
 */
export class AdvancedHolographicVisualizer {
    constructor(canvasContainer, variant = 0) {
        this.container = canvasContainer;
        this.variant = variant;
        this.canvases = {};
        this.contexts = {};
        
        // 10-Layer Configuration
        this.layers = [
            { name: 'deep-background', opacity: 0.1, blend: 'normal', transform: 'scale(1.1)', filter: 'blur(3px)' },
            { name: 'ambient-field', opacity: 0.15, blend: 'multiply', transform: 'scale(1.05)', filter: 'blur(2px)' },
            { name: 'shadow-depth', opacity: 0.4, blend: 'multiply', transform: 'translate(3px, 3px)', filter: 'blur(2px) brightness(0.6)' },
            { name: 'base-geometry', opacity: 0.6, blend: 'normal', transform: 'scale(1.0)', filter: 'none' },
            { name: 'secondary-geo', opacity: 0.5, blend: 'overlay', transform: 'scale(0.95)', filter: 'none' },
            { name: 'content-layer', opacity: 0.8, blend: 'normal', transform: 'scale(1.0)', filter: 'none' },
            { name: 'highlight-layer', opacity: 0.3, blend: 'screen', transform: 'translate(-1px, -1px)', filter: 'blur(1px) brightness(1.4)' },
            { name: 'accent-layer', opacity: 0.25, blend: 'color-dodge', transform: 'scale(1.02)', filter: 'blur(2px)' },
            { name: 'shimmer-layer', opacity: 0.2, blend: 'soft-light', transform: 'scale(0.98)', filter: 'blur(1px)' },
            { name: 'hologram-edge', opacity: 0.4, blend: 'screen', transform: 'scale(1.03)', filter: 'blur(1px) brightness(1.6)' }
        ];
        
        // Multi-geometry system
        this.geometryTypes = [
            'TETRAHEDRON', 'HYPERCUBE', 'SPHERE', 'TORUS', 
            'KLEIN_BOTTLE', 'FRACTAL', 'WAVE', 'CRYSTAL'
        ];
        
        // Advanced parameters
        this.params = this.generateAdvancedParams(variant);
        
        // Initialize state
        this.mouseX = 0.5;
        this.mouseY = 0.5;
        this.mouseIntensity = 0.0;
        this.time = 0;
        this.startTime = Date.now();
        
        // Multi-geometry blending
        this.geometryBlend = 0.0;
        this.secondaryGeometry = (this.params.primaryGeometry + 2) % 8;
        this.tertiaryGeometry = (this.params.primaryGeometry + 5) % 8;
        
        // Layer-specific parameters
        this.layerRotations = new Array(10).fill(0).map(() => Math.random() * 360);
        this.layerScales = new Array(10).fill(0).map(() => 0.8 + Math.random() * 0.4);
        this.layerOffsets = new Array(10).fill(0).map(() => ({ x: (Math.random() - 0.5) * 0.1, y: (Math.random() - 0.5) * 0.1 }));
        
        this.initCanvases();
        this.initShaders();
        this.resize();
        this.animate();
    }
    
    generateAdvancedParams(variant) {
        const baseGeometry = variant % 8;
        const complexityLevel = Math.floor(variant / 8);
        
        return {
            primaryGeometry: baseGeometry,
            density: 1.0 + complexityLevel * 0.3,
            speed: 0.5 + complexityLevel * 0.2,
            chaos: complexityLevel * 0.15,
            morph: complexityLevel * 0.25,
            hue: (variant * 15.5) % 360,
            saturation: 0.7 + (complexityLevel * 0.1),
            intensity: 0.6 + (complexityLevel * 0.15),
            
            // Advanced multi-geometry parameters
            geometryBlendRate: 0.3 + complexityLevel * 0.2,
            layerSeparation: 0.8 + complexityLevel * 0.1,
            depthComplexity: 1.5 + complexityLevel * 0.5,
            hologramIntensity: 0.7 + complexityLevel * 0.2,
            multiGeometryMix: 0.4 + complexityLevel * 0.3,
            
            // Color harmonics
            colorHarmonic1: (variant * 25.3) % 360,
            colorHarmonic2: (variant * 37.7) % 360,
            colorHarmonic3: (variant * 43.1) % 360,
            
            // Layer modulation
            layerPhaseShift: variant * 0.1,
            layerFrequency: 1.0 + (variant % 3) * 0.5,
            layerAmplitude: 0.3 + (variant % 4) * 0.2
        };
    }
    
    initCanvases() {
        // Create 10 canvas layers
        this.layers.forEach((layer, index) => {
            const canvas = document.createElement('canvas');
            canvas.id = `${layer.name}-canvas`;
            canvas.style.position = 'absolute';
            canvas.style.top = '0';
            canvas.style.left = '0';
            canvas.style.width = '100%';
            canvas.style.height = '100%';
            canvas.style.opacity = layer.opacity;
            canvas.style.mixBlendMode = layer.blend;
            canvas.style.transform = layer.transform;
            canvas.style.filter = layer.filter;
            canvas.style.zIndex = index + 1;
            canvas.style.pointerEvents = 'none';
            
            this.container.appendChild(canvas);
            this.canvases[layer.name] = canvas;
            
            const gl = canvas.getContext('webgl');
            if (gl) {
                this.contexts[layer.name] = gl;
            }
        });
    }
    
    initShaders() {
        // Enhanced shader system for multi-geometry rendering
        Object.keys(this.contexts).forEach(layerName => {
            const gl = this.contexts[layerName];
            if (gl) {
                this.setupShaderProgram(gl, layerName);
            }
        });
    }
    
    setupShaderProgram(gl, layerName) {
        // Advanced vertex shader with multi-geometry support
        const vertexShader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vertexShader, `
            attribute vec4 position;
            varying vec2 vUv;
            void main() {
                vUv = position.xy * 0.5 + 0.5;
                gl_Position = position;
            }
        `);
        gl.compileShader(vertexShader);
        
        // Advanced fragment shader with 10-layer multi-geometry system
        const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(fragmentShader, this.getAdvancedFragmentShader(layerName));
        gl.compileShader(fragmentShader);
        
        const program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        gl.useProgram(program);
        
        // Store program and uniforms
        this.contexts[layerName].program = program;
        this.contexts[layerName].uniforms = this.getUniforms(gl, program);
        
        // Set up geometry
        this.setupGeometry(gl);
    }
    
    getAdvancedFragmentShader(layerName) {
        return `
            precision highp float;
            varying vec2 vUv;
            
            uniform float u_time;
            uniform vec2 u_resolution;
            uniform vec2 u_mouse;
            uniform float u_mouseIntensity;
            
            // Multi-geometry parameters
            uniform float u_primaryGeometry;
            uniform float u_secondaryGeometry;
            uniform float u_tertiaryGeometry;
            uniform float u_geometryBlend;
            
            // Advanced holographic parameters
            uniform float u_density;
            uniform float u_speed;
            uniform float u_chaos;
            uniform float u_morph;
            uniform float u_hue;
            uniform float u_saturation;
            uniform float u_intensity;
            uniform float u_layerPhase;
            uniform float u_depthComplexity;
            uniform float u_hologramIntensity;
            
            // Layer-specific parameters
            uniform float u_layerRotation;
            uniform float u_layerScale;
            uniform vec2 u_layerOffset;
            
            // Color harmonics
            uniform float u_colorHarmonic1;
            uniform float u_colorHarmonic2;
            uniform float u_colorHarmonic3;
            
            // Advanced distance functions for multiple geometries
            float sdTetrahedron(vec3 p, float scale) {
                float d1 = dot(p, normalize(vec3(1.0, 1.0, 1.0))) - scale;
                float d2 = dot(p, normalize(vec3(-1.0, -1.0, 1.0))) - scale;
                float d3 = dot(p, normalize(vec3(-1.0, 1.0, -1.0))) - scale;
                float d4 = dot(p, normalize(vec3(1.0, -1.0, -1.0))) - scale;
                return max(max(d1, d2), max(d3, d4));
            }
            
            float sdHypercube(vec3 p, float scale) {
                vec3 d = abs(p) - vec3(scale);
                return min(max(d.x, max(d.y, d.z)), 0.0) + length(max(d, 0.0));
            }
            
            float sdSphere(vec3 p, float radius) {
                return length(p) - radius;
            }
            
            float sdTorus(vec3 p, vec2 t) {
                vec2 q = vec2(length(p.xz) - t.x, p.y);
                return length(q) - t.y;
            }
            
            float sdKleinBottle(vec3 p, float scale) {
                float r = scale;
                float a = atan(p.y, p.x);
                float s = sin(a * 2.0) * 0.3;
                vec2 q = vec2(length(p.xy) - r - s, p.z);
                return length(q) - 0.2 * scale;
            }
            
            float sdFractal(vec3 p, float scale) {
                vec3 z = p;
                float dr = 1.0;
                float r = 0.0;
                for (int i = 0; i < 8; i++) {
                    r = length(z);
                    if (r > 2.0) break;
                    
                    float theta = acos(z.z / r);
                    float phi = atan(z.y, z.x);
                    dr = pow(r, 7.0) * 8.0 * dr + 1.0;
                    
                    float zr = pow(r, 8.0);
                    theta = theta * 8.0;
                    phi = phi * 8.0;
                    
                    z = zr * vec3(sin(theta) * cos(phi), sin(phi) * sin(theta), cos(theta));
                    z += p;
                }
                return 0.5 * log(r) * r / dr;
            }
            
            float sdWave(vec3 p, float scale) {
                float wave1 = sin(p.x * 3.0 + u_time) * 0.3;
                float wave2 = sin(p.z * 4.0 + u_time * 1.3) * 0.2;
                return abs(p.y - wave1 - wave2) - 0.1 * scale;
            }
            
            float sdCrystal(vec3 p, float scale) {
                vec3 d = abs(mod(p, 2.0) - 1.0) - vec3(scale * 0.3);
                return min(max(d.x, max(d.y, d.z)), 0.0) + length(max(d, 0.0));
            }
            
            // Multi-geometry distance function
            float getDistance(vec3 p, float geoType) {
                float scale = u_density * u_layerScale;
                
                if (geoType < 0.5) return sdTetrahedron(p, scale);
                else if (geoType < 1.5) return sdHypercube(p, scale);
                else if (geoType < 2.5) return sdSphere(p, scale);
                else if (geoType < 3.5) return sdTorus(p, vec2(scale, scale * 0.3));
                else if (geoType < 4.5) return sdKleinBottle(p, scale);
                else if (geoType < 5.5) return sdFractal(p, scale);
                else if (geoType < 6.5) return sdWave(p, scale);
                else return sdCrystal(p, scale);
            }
            
            // Advanced color mixing with harmonics
            vec3 getHolographicColor(float dist, vec3 pos) {
                float hue1 = u_hue + sin(u_time * 0.5) * 30.0;
                float hue2 = u_colorHarmonic1 + cos(u_time * 0.7) * 25.0;
                float hue3 = u_colorHarmonic2 + sin(u_time * 0.3) * 20.0;
                
                vec3 color1 = hsv2rgb(vec3(hue1 / 360.0, u_saturation, u_intensity));
                vec3 color2 = hsv2rgb(vec3(hue2 / 360.0, u_saturation * 0.8, u_intensity * 1.2));
                vec3 color3 = hsv2rgb(vec3(hue3 / 360.0, u_saturation * 1.1, u_intensity * 0.9));
                
                float mixer1 = sin(pos.x * 5.0 + u_time) * 0.5 + 0.5;
                float mixer2 = cos(pos.y * 4.0 + u_time * 1.3) * 0.5 + 0.5;
                
                vec3 mixed = mix(color1, color2, mixer1);
                mixed = mix(mixed, color3, mixer2 * 0.3);
                
                return mixed;
            }
            
            vec3 hsv2rgb(vec3 c) {
                vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
                vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
                return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
            }
            
            void main() {
                vec2 uv = (vUv - 0.5) * 2.0;
                uv.x *= u_resolution.x / u_resolution.y;
                
                // Apply layer transformations
                float rotation = u_layerRotation + u_time * u_speed * 0.1;
                float c = cos(rotation);
                float s = sin(rotation);
                mat2 rot = mat2(c, -s, s, c);
                uv = rot * uv;
                uv += u_layerOffset;
                
                // Multi-geometry blending
                vec3 pos = vec3(uv, sin(u_time * u_speed + u_layerPhase) * u_depthComplexity);
                
                float dist1 = getDistance(pos, u_primaryGeometry);
                float dist2 = getDistance(pos * 1.2, u_secondaryGeometry);
                float dist3 = getDistance(pos * 0.8, u_tertiaryGeometry);
                
                // Blend multiple geometries
                float blendFactor = sin(u_time * u_geometryBlend) * 0.5 + 0.5;
                float finalDist = mix(dist1, dist2, blendFactor * 0.6);
                finalDist = mix(finalDist, dist3, blendFactor * 0.3);
                
                // Add chaos and morph
                finalDist += sin(pos.x * 10.0 + u_time * 2.0) * u_chaos * 0.1;
                finalDist += cos(pos.y * 8.0 + u_time * 1.5) * u_morph * 0.15;
                
                // Holographic rendering
                float intensity = 1.0 / (1.0 + abs(finalDist) * 20.0);
                intensity = pow(intensity, 2.0);
                
                // Mouse interaction
                vec2 mouseEffect = u_mouse - vUv;
                float mouseDist = length(mouseEffect);
                intensity += u_mouseIntensity * exp(-mouseDist * 5.0) * 0.5;
                
                // Get holographic color
                vec3 color = getHolographicColor(finalDist, pos);
                color *= intensity * u_hologramIntensity;
                
                // Layer-specific modulation
                float layerMod = sin(u_layerPhase * 3.0 + u_time) * 0.2 + 0.8;
                color *= layerMod;
                
                gl_FragColor = vec4(color, intensity * 0.8);
            }
        `;
    }
    
    getUniforms(gl, program) {
        return {
            u_time: gl.getUniformLocation(program, 'u_time'),
            u_resolution: gl.getUniformLocation(program, 'u_resolution'),
            u_mouse: gl.getUniformLocation(program, 'u_mouse'),
            u_mouseIntensity: gl.getUniformLocation(program, 'u_mouseIntensity'),
            u_primaryGeometry: gl.getUniformLocation(program, 'u_primaryGeometry'),
            u_secondaryGeometry: gl.getUniformLocation(program, 'u_secondaryGeometry'),
            u_tertiaryGeometry: gl.getUniformLocation(program, 'u_tertiaryGeometry'),
            u_geometryBlend: gl.getUniformLocation(program, 'u_geometryBlend'),
            u_density: gl.getUniformLocation(program, 'u_density'),
            u_speed: gl.getUniformLocation(program, 'u_speed'),
            u_chaos: gl.getUniformLocation(program, 'u_chaos'),
            u_morph: gl.getUniformLocation(program, 'u_morph'),
            u_hue: gl.getUniformLocation(program, 'u_hue'),
            u_saturation: gl.getUniformLocation(program, 'u_saturation'),
            u_intensity: gl.getUniformLocation(program, 'u_intensity'),
            u_layerPhase: gl.getUniformLocation(program, 'u_layerPhase'),
            u_depthComplexity: gl.getUniformLocation(program, 'u_depthComplexity'),
            u_hologramIntensity: gl.getUniformLocation(program, 'u_hologramIntensity'),
            u_layerRotation: gl.getUniformLocation(program, 'u_layerRotation'),
            u_layerScale: gl.getUniformLocation(program, 'u_layerScale'),
            u_layerOffset: gl.getUniformLocation(program, 'u_layerOffset'),
            u_colorHarmonic1: gl.getUniformLocation(program, 'u_colorHarmonic1'),
            u_colorHarmonic2: gl.getUniformLocation(program, 'u_colorHarmonic2'),
            u_colorHarmonic3: gl.getUniformLocation(program, 'u_colorHarmonic3')
        };
    }
    
    setupGeometry(gl) {
        const vertices = new Float32Array([
            -1, -1,  1, -1,  -1, 1,
            -1,  1,   1, -1,   1, 1
        ]);
        
        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
        
        const position = gl.getAttribLocation(gl.program, 'position');
        gl.enableVertexAttribArray(position);
        gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    }
    
    render() {
        this.time = (Date.now() - this.startTime) / 1000.0;
        this.geometryBlend += 0.01;
        
        // Update layer parameters
        this.layers.forEach((layer, index) => {
            this.layerRotations[index] += (0.5 + index * 0.1) * this.params.speed;
        });
        
        // Render each layer
        Object.keys(this.contexts).forEach((layerName, index) => {
            const gl = this.contexts[layerName];
            if (gl && gl.program) {
                this.renderLayer(gl, layerName, index);
            }
        });
    }
    
    renderLayer(gl, layerName, layerIndex) {
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        
        gl.useProgram(gl.program);
        
        // Set uniforms
        const uniforms = gl.uniforms;
        gl.uniform1f(uniforms.u_time, this.time);
        gl.uniform2f(uniforms.u_resolution, gl.canvas.width, gl.canvas.height);
        gl.uniform2f(uniforms.u_mouse, this.mouseX, this.mouseY);
        gl.uniform1f(uniforms.u_mouseIntensity, this.mouseIntensity);
        
        gl.uniform1f(uniforms.u_primaryGeometry, this.params.primaryGeometry);
        gl.uniform1f(uniforms.u_secondaryGeometry, this.secondaryGeometry);
        gl.uniform1f(uniforms.u_tertiaryGeometry, this.tertiaryGeometry);
        gl.uniform1f(uniforms.u_geometryBlend, this.params.geometryBlendRate);
        
        gl.uniform1f(uniforms.u_density, this.params.density);
        gl.uniform1f(uniforms.u_speed, this.params.speed);
        gl.uniform1f(uniforms.u_chaos, this.params.chaos);
        gl.uniform1f(uniforms.u_morph, this.params.morph);
        gl.uniform1f(uniforms.u_hue, this.params.hue);
        gl.uniform1f(uniforms.u_saturation, this.params.saturation);
        gl.uniform1f(uniforms.u_intensity, this.params.intensity);
        
        gl.uniform1f(uniforms.u_layerPhase, this.params.layerPhaseShift + layerIndex * 0.5);
        gl.uniform1f(uniforms.u_depthComplexity, this.params.depthComplexity);
        gl.uniform1f(uniforms.u_hologramIntensity, this.params.hologramIntensity);
        
        gl.uniform1f(uniforms.u_layerRotation, this.layerRotations[layerIndex]);
        gl.uniform1f(uniforms.u_layerScale, this.layerScales[layerIndex]);
        gl.uniform2f(uniforms.u_layerOffset, this.layerOffsets[layerIndex].x, this.layerOffsets[layerIndex].y);
        
        gl.uniform1f(uniforms.u_colorHarmonic1, this.params.colorHarmonic1);
        gl.uniform1f(uniforms.u_colorHarmonic2, this.params.colorHarmonic2);
        gl.uniform1f(uniforms.u_colorHarmonic3, this.params.colorHarmonic3);
        
        // Enable blending
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        
        // Draw
        gl.drawArrays(gl.TRIANGLES, 0, 6);
    }
    
    resize() {
        const rect = this.container.getBoundingClientRect();
        Object.values(this.canvases).forEach(canvas => {
            canvas.width = rect.width;
            canvas.height = rect.height;
        });
    }
    
    updateMouse(x, y, intensity = 0) {
        this.mouseX = x;
        this.mouseY = y;
        this.mouseIntensity = intensity;
    }
    
    animate() {
        this.render();
        requestAnimationFrame(() => this.animate());
    }
    
    setVariant(variant) {
        this.variant = variant;
        this.params = this.generateAdvancedParams(variant);
        this.secondaryGeometry = (this.params.primaryGeometry + 2) % 8;
        this.tertiaryGeometry = (this.params.primaryGeometry + 5) % 8;
    }
}