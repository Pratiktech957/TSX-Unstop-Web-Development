    // Wait for the page to load
        window.addEventListener('load', () => {
            // Hide loading screen after 2 seconds
            setTimeout(() => {
                const loadingScreen = document.getElementById('loadingScreen');
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 1000);
            }, 2000);
            
            // Initialize Three.js scene
            initThreeJS();
            
            // 3D Card Tilt Effect
            const tiltCards = document.querySelectorAll('.tilt-card');
            
            tiltCards.forEach(card => {
                card.addEventListener('mousemove', (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    
                    const angleX = (y - centerY) / 20;
                    const angleY = (centerX - x) / 20;
                    
                    card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
                });
                
                card.addEventListener('mouseleave', () => {
                    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
                });
            });
            
            // Smooth scroll for navigation links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    const targetSection = document.querySelector(targetId);
                    
                    window.scrollTo({
                        top: targetSection.offsetTop,
                        behavior: 'smooth'
                    });
                });
            });
            
            // Navbar color change on scroll
            window.addEventListener('scroll', () => {
                const navbar = document.querySelector('.navbar');
                if (window.scrollY > 50) {
                    navbar.style.backgroundColor = 'rgba(15, 22, 36, 0.95)';
                } else {
                    navbar.style.backgroundColor = 'rgba(15, 22, 36, 0.8)';
                }
            });
        });

        // Three.js Scene Initialization
        function initThreeJS() {
            // Create scene, camera, and renderer
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            const renderer = new THREE.WebGLRenderer({
                canvas: document.getElementById('bg'),
                antialias: true,
                alpha: true
            });
            
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(window.devicePixelRatio);
            
            // Add ambient light
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
            scene.add(ambientLight);
            
            // Add directional light
            const directionalLight = new THREE.DirectionalLight(0x64ffda, 1);
            directionalLight.position.set(5, 5, 5);
            scene.add(directionalLight);
            
            // Create particles
            const particlesGeometry = new THREE.BufferGeometry();
            const particlesCount = 2000;
            
            const posArray = new Float32Array(particlesCount * 3);
            
            for(let i = 0; i < particlesCount * 3; i++) {
                posArray[i] = (Math.random() - 0.5) * 15;
            }
            
            particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
            
            const particlesMaterial = new THREE.PointsMaterial({
                size: 0.02,
                color: 0x64ffda,
                transparent: true,
                opacity: 0.8
            });
            
            const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
            scene.add(particlesMesh);
            
            // Create floating geometric shapes
            function createShape(geometry, color, x, y, z) {
                const material = new THREE.MeshStandardMaterial({ 
                    color: color,
                    transparent: true,
                    opacity: 0.7,
                    wireframe: true
                });
                const shape = new THREE.Mesh(geometry, material);
                shape.position.set(x, y, z);
                scene.add(shape);
                return shape;
            }
            
            const dodecahedron = createShape(
                new THREE.DodecahedronGeometry(1, 0),
                0x64ffda,
                -5,
                0,
                -10
            );
            
            const icosahedron = createShape(
                new THREE.IcosahedronGeometry(0.8, 0),
                0xff6b6b,
                4,
                2,
                -8
            );
            
            const octahedron = createShape(
                new THREE.OctahedronGeometry(0.6, 0),
                0xfeca57,
                -3,
                -2,
                -6
            );
            
            // Position camera
            camera.position.z = 5;
            
            // Mouse movement effect
            let mouseX = 0;
            let mouseY = 0;
            
            document.addEventListener('mousemove', (event) => {
                mouseX = (event.clientX / window.innerWidth) * 2 - 1;
                mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
            });
            
            // Handle window resize
            window.addEventListener('resize', () => {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            });
            
            // Animation loop
            function animate() {
                requestAnimationFrame(animate);
                
                // Rotate particles
                particlesMesh.rotation.x += 0.0005;
                particlesMesh.rotation.y += 0.0003;
                
                // Rotate shapes
                dodecahedron.rotation.x += 0.005;
                dodecahedron.rotation.y += 0.005;
                
                icosahedron.rotation.x -= 0.004;
                icosahedron.rotation.z += 0.004;
                
                octahedron.rotation.y += 0.006;
                octahedron.rotation.z -= 0.006;
                
                // Move scene based on mouse position
                particlesMesh.position.x = mouseX * 0.1;
                particlesMesh.position.y = mouseY * 0.1;
                
                // Parallax effect for shapes
                dodecahedron.position.x = mouseX * 0.05;
                dodecahedron.position.y = mouseY * 0.05;
                
                icosahedron.position.x = -mouseX * 0.08;
                icosahedron.position.y = -mouseY * 0.08;
                
                octahedron.position.x = -mouseX * 0.03;
                octahedron.position.y = mouseY * 0.03;
                
                renderer.render(scene, camera);
            }
            
            animate();
        }