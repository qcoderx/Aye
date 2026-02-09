// Visual State System - Dynamic Shaders for Organ States
import * as THREE from 'three';

export class OrganVisualState {
    static createMaterial(organType, symptomState, healthScore) {
        const materials = {
            'Lungs': this.createLungsMaterial(symptomState, healthScore),
            'Veins': this.createVeinsMaterial(symptomState, healthScore),
            'Skin': this.createSkinMaterial(symptomState, healthScore)
        };
        return materials[organType] || this.createDefaultMaterial();
    }

    static createLungsMaterial(symptomState, healthScore) {
        const colors = this.getStateColors(symptomState, healthScore);
        
        return new THREE.ShaderMaterial({
            uniforms: {
                primaryColor: { value: colors.primary },
                damageColor: { value: colors.damage },
                time: { value: 0.0 },
                healthScore: { value: healthScore / 100.0 },
                inflammation: { value: symptomState === 'INFLAMED' ? 1.0 : 0.0 }
            },
            vertexShader: `
                varying vec3 vPosition;
                varying vec3 vNormal;
                varying float vIntensity;
                uniform float time;
                uniform float inflammation;
                
                void main() {
                    vPosition = position;
                    vNormal = normalize(normalMatrix * normal);
                    
                    // Breathing animation
                    vec3 pos = position;
                    float breathe = sin(time * 2.0) * 0.02 * (1.0 - inflammation);
                    pos += normal * breathe;
                    
                    // Inflammation pulsing
                    if (inflammation > 0.5) {
                        float pulse = sin(time * 5.0) * 0.05;
                        pos += normal * pulse * inflammation;
                    }
                    
                    vec3 viewDir = normalize(cameraPosition - pos);
                    vIntensity = pow(1.0 - abs(dot(vNormal, viewDir)), 2.0);
                    
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
                }
            `,
            fragmentShader: `
                uniform vec3 primaryColor;
                uniform vec3 damageColor;
                uniform float time;
                uniform float healthScore;
                uniform float inflammation;
                varying vec3 vPosition;
                varying vec3 vNormal;
                varying float vIntensity;
                
                void main() {
                    // Damage pattern
                    float noise = fract(sin(dot(vPosition.xy, vec2(12.9898, 78.233))) * 43758.5453);
                    float damagePattern = smoothstep(healthScore, healthScore + 0.3, noise);
                    
                    // Mix colors based on health
                    vec3 color = mix(damageColor, primaryColor, healthScore);
                    
                    // Add inflammation effect
                    if (inflammation > 0.5) {
                        float flicker = sin(time * 10.0 + vPosition.x * 5.0) * 0.5 + 0.5;
                        color = mix(color, damageColor, flicker * 0.6);
                    }
                    
                    // Edge glow
                    color += primaryColor * vIntensity * 0.5;
                    
                    float alpha = 0.3 + vIntensity * 0.6 + damagePattern * 0.2;
                    gl_FragColor = vec4(color, alpha);
                }
            `,
            side: THREE.DoubleSide,
            blending: THREE.AdditiveBlending,
            transparent: true,
            depthWrite: false
        });
    }

    static createVeinsMaterial(symptomState, healthScore) {
        const colors = this.getStateColors(symptomState, healthScore);
        
        return new THREE.ShaderMaterial({
            uniforms: {
                healthyColor: { value: new THREE.Color(0x0066FF) },
                acidicColor: { value: new THREE.Color(0xFF3300) },
                time: { value: 0.0 },
                healthScore: { value: healthScore / 100.0 },
                inflammation: { value: symptomState === 'INFLAMED' ? 1.0 : 0.0 }
            },
            vertexShader: `
                varying vec3 vPosition;
                varying vec3 vNormal;
                uniform float time;
                
                void main() {
                    vPosition = position;
                    vNormal = normalize(normalMatrix * normal);
                    
                    // Flow animation
                    vec3 pos = position;
                    float flow = sin(position.y * 2.0 - time * 3.0) * 0.01;
                    pos.x += flow;
                    
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
                }
            `,
            fragmentShader: `
                uniform vec3 healthyColor;
                uniform vec3 acidicColor;
                uniform float time;
                uniform float healthScore;
                uniform float inflammation;
                varying vec3 vPosition;
                varying vec3 vNormal;
                
                void main() {
                    // Flow pattern
                    float flow = sin(vPosition.y * 3.0 - time * 2.0) * 0.5 + 0.5;
                    
                    // Acidification effect - stronger blue bias for healing
                    float adjustedHealth = healthScore * healthScore; // Square for stronger blue
                    vec3 color = mix(acidicColor, healthyColor, adjustedHealth);
                    
                    // Corrosive pattern for inflammation
                    if (inflammation > 0.5) {
                        float corrosion = fract(sin(dot(vPosition.xz, vec2(12.9, 78.2))) * 43758.5);
                        color = mix(color, acidicColor, corrosion * 0.7);
                    }
                    
                    // Pulsing flow
                    color *= (0.7 + flow * 0.3);
                    
                    float alpha = 0.3 + flow * 0.4;
                    gl_FragColor = vec4(color, alpha);
                }
            `,
            side: THREE.DoubleSide,
            blending: THREE.AdditiveBlending,
            transparent: true,
            depthWrite: false
        });
    }

    static createSkinMaterial(symptomState, healthScore) {
        // Keep original hologram look, only change when damaged
        const baseColor = symptomState === 'INFLAMED' ? 0xFF3300 : 
                         healthScore < 50 ? 0x996633 : 0x2E8CE0;
        
        return new THREE.ShaderMaterial({
            uniforms: {
                glowColor: { value: new THREE.Color(baseColor) },
                whiteColor: { value: new THREE.Color(0xFFFFFF) },
                viewVector: { value: new THREE.Vector3() },
                time: { value: 0.0 }
            },
            vertexShader: `
                uniform vec3 viewVector;
                varying float intensity;
                varying vec3 vPosition;
                void main() {
                    vPosition = position;
                    vec3 vNormal = normalize(normalMatrix * normal);
                    vec3 vNormel = normalize(normalMatrix * viewVector);
                    intensity = pow(0.65 - dot(vNormal, vNormel), 2.0); 
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform vec3 glowColor;
                uniform vec3 whiteColor;
                varying float intensity;
                varying vec3 vPosition;
                void main() {
                    float gridSize = 5.0;
                    float lineWidth = 0.15;
                    vec3 grid = abs(fract(vPosition / gridSize - 0.5) - 0.5) / fwidth(vPosition / gridSize);
                    float gridLine = min(min(grid.x, grid.y), grid.z);
                    float gridStrength = 1.0 - min(gridLine / lineWidth, 1.0);
                    
                    vec3 mixedColor = mix(glowColor, whiteColor, 0.1);
                    vec3 glow = mixedColor * (intensity * 1.2 + gridStrength * 1.0);
                    float alpha = intensity * 0.3 + gridStrength * 0.5;
                    gl_FragColor = vec4(glow, alpha); 
                }
            `,
            side: THREE.DoubleSide,
            blending: THREE.AdditiveBlending,
            transparent: true,
            depthWrite: false
        });
    }

    static getStateColors(symptomState, healthScore) {
        const states = {
            'HEALTHY': {
                primary: new THREE.Color(0x00FF88),
                damage: new THREE.Color(0x88FFCC)
            },
            'INFLAMED': {
                primary: new THREE.Color(0xFF3300),
                damage: new THREE.Color(0xFF6600)
            },
            'HEALING': {
                primary: new THREE.Color(0xFFAA00),
                damage: new THREE.Color(0xFFDD88)
            }
        };
        return states[symptomState] || states['HEALTHY'];
    }

    static createDefaultMaterial() {
        return new THREE.MeshBasicMaterial({
            color: 0x2E8CE0,
            transparent: true,
            opacity: 0.5
        });
    }
}
