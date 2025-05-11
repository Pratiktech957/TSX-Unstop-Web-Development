 document.addEventListener('DOMContentLoaded', function() {
      const filterBtns = document.querySelectorAll('.filter-btn');
      const portfolioItems = document.querySelectorAll('.portfolio-item');
      
      filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
          // Remove active class from all buttons
          filterBtns.forEach(btn => btn.classList.remove('active'));
          // Add active class to clicked button
          this.classList.add('active');
          
          const filter = this.getAttribute('data-filter');
          
          portfolioItems.forEach(item => {
            if (filter === 'all') {
              item.style.display = 'block';
            } else {
              const categories = item.getAttribute('data-category');
              if (categories && categories.includes(filter)) {
                item.style.display = 'block';
              } else {
                item.style.display = 'none';
              }
            }
          });
        });
      });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
      const navbar = document.querySelector('.navbar');
      if (window.scrollY > 50) {
        navbar.style.padding = '10px 0';
      } else {
        navbar.style.padding = '20px 0';
      }
    });

    // Advanced Three.js Animation with Designer-Themed Objects
    (function() {
      const canvasContainer = document.getElementById('canvas-container');
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      canvasContainer.appendChild(renderer.domElement);
      
      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);
      
      const pointLight = new THREE.PointLight(0xffffff, 0.5);
      pointLight.position.set(2, 3, 4);
      scene.add(pointLight);
      
      // Helper function to create wireframe material
      function createWireframeMaterial(color) {
        return new THREE.MeshBasicMaterial({
          color: color,
          wireframe: true,
          transparent: true,
          opacity: 0.7
        });
      }
      
      // Helper function to create solid material
      function createSolidMaterial(color) {
        return new THREE.MeshPhongMaterial({
          color: color,
          transparent: true,
          opacity: 0.7,
          specular: 0x111111,
          shininess: 30
        });
      }
      
      // Helper function to add an object to scene
      function createFloatingObject(geometry, material, x, y, z, scale = 1) {
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(x, y, z);
        mesh.scale.set(scale, scale, scale);
        scene.add(mesh);
        return mesh;
      }
      
      // Create fancy design-related objects
      const objects = [];
      
      // Create color palette suitable for UI/UX portfolio
      const colors = {
        primary: 0x5e72e4,    // Blue-purple
        accent1: 0xff6584,     // Pink
        accent2: 0x4caf50,     // Green
        accent3: 0xffa726,     // Orange
        accent4: 0x2196f3      // Blue
      };
      
      // 1. UI Component Grid - Representing layout design
      const gridGroup = new THREE.Group();
      scene.add(gridGroup);
      gridGroup.position.set(-2, 0.5, -3);
      
      // Create a grid of small cubes representing UI components
      const smallCubeSize = 0.08;
      const gridSize = 4;
      const gridSpacing = 0.15;
      
      for (let x = 0; x < gridSize; x++) {
        for (let y = 0; y < gridSize; y++) {
          const cubeGeometry = new THREE.BoxGeometry(smallCubeSize, smallCubeSize, smallCubeSize);
          // Alternate colors for grid items
          const color = (x + y) % 2 === 0 ? colors.primary : colors.accent1;
          const cubeMaterial = createSolidMaterial(color);
          
          const posX = x * gridSpacing - (gridSize * gridSpacing) / 2;
          const posY = y * gridSpacing - (gridSize * gridSpacing) / 2;
          
          const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
          cube.position.set(posX, posY, 0);
          gridGroup.add(cube);
          objects.push(cube);
        }
      }
      
      // 2. Interactive Prototype Model - Smartphone frame with screen
      const phoneGroup = new THREE.Group();
      scene.add(phoneGroup);
      phoneGroup.position.set(1.8, 0, -3);
      
      // Phone body
      const phoneGeometry = new THREE.BoxGeometry(0.8, 1.6, 0.1);
      const phoneMaterial = createSolidMaterial(0x333333);
      const phone = new THREE.Mesh(phoneGeometry, phoneMaterial);
      phoneGroup.add(phone);
      
      // Phone screen
      const screenGeometry = new THREE.BoxGeometry(0.7, 1.4, 0.02);
      const screenMaterial = createSolidMaterial(0x151515);
      const screen = new THREE.Mesh(screenGeometry, screenMaterial);
      screen.position.z = 0.06;
      phoneGroup.add(screen);
      
      // UI elements on screen (simplified)
      const uiElementsGeometry = new THREE.PlaneGeometry(0.65, 1.35);
      const uiElementsMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x101830, 
        transparent: true,
        opacity: 0.9
      });
      const uiElements = new THREE.Mesh(uiElementsGeometry, uiElementsMaterial);
      uiElements.position.z = 0.07;
      phoneGroup.add(uiElements);
      
      // Add UI header bar
      const headerGeometry = new THREE.PlaneGeometry(0.65, 0.15);
      const headerMaterial = new THREE.MeshBasicMaterial({ color: colors.primary });
      const header = new THREE.Mesh(headerGeometry, headerMaterial);
      header.position.z = 0.08;
      header.position.y = 0.6;
      phoneGroup.add(header);
      
      // Add UI bottom navigation
      const navGeometry = new THREE.PlaneGeometry(0.65, 0.12);
      const navMaterial = new THREE.MeshBasicMaterial({ color: 0xfafafa });
      const nav = new THREE.Mesh(navGeometry, navMaterial);
      nav.position.z = 0.08;
      nav.position.y = -0.615;
      phoneGroup.add(nav);
      
      // Add basic UI elements (simplified)
      const elementGeometry = new THREE.PlaneGeometry(0.55, 0.12);
      
      for (let i = 0; i < 4; i++) {
        const yPos = 0.3 - (i * 0.22);
        const elementMaterial = new THREE.MeshBasicMaterial({ 
          color: i % 2 === 0 ? 0xfafafa : 0xefefef 
        });
        const element = new THREE.Mesh(elementGeometry, elementMaterial);
        element.position.set(0, yPos, 0.08);
        phoneGroup.add(element);
      }
      
      objects.push(phoneGroup);
      
      // 3. Color Palette - Representing design system
      const paletteGroup = new THREE.Group();
      scene.add(paletteGroup);
      paletteGroup.position.set(0, -1.5, -2.5);
      
      // Create color swatches
      const swatchGeometry = new THREE.BoxGeometry(0.35, 0.35, 0.05);
      const paletteColors = [colors.primary, colors.accent1, colors.accent2, colors.accent3, colors.accent4];
      
      for (let i = 0; i < paletteColors.length; i++) {
        const swatchMaterial = createSolidMaterial(paletteColors[i]);
        const swatch = new THREE.Mesh(swatchGeometry, swatchMaterial);
        swatch.position.x = (i - 2) * 0.4;
        paletteGroup.add(swatch);
        objects.push(swatch);
      }
      
      // 4. Wireframe Model - Representing wireframing/prototyping
      const wireframeModel = new THREE.Group();
      scene.add(wireframeModel);
      wireframeModel.position.set(-1.2, -0.7, -2);
      
      // Create complex wireframe object
      const icosaGeometry = new THREE.IcosahedronGeometry(0.4, 1);
      const wireframeMaterial = createWireframeMaterial(colors.accent4);
      const icosa = new THREE.Mesh(icosaGeometry, wireframeMaterial);
      wireframeModel.add(icosa);
      objects.push(wireframeModel);
      
      // 5. Design Tool Icons - Representing design tools
      const toolsGroup = new THREE.Group();
      scene.add(toolsGroup);
      toolsGroup.position.set(1, 1.2, -3);
      
      // Pen tool (simplified representation)
      const penGroup = new THREE.Group();
      toolsGroup.add(penGroup);
      
      const penBodyGeometry = new THREE.CylinderGeometry(0.03, 0.03, 0.4, 16);
      const penBodyMaterial = createSolidMaterial(0xeeeeee);
      const penBody = new THREE.Mesh(penBodyGeometry, penBodyMaterial);
      penBody.rotation.x = Math.PI / 2;
      penGroup.add(penBody);
      
      const penTipGeometry = new THREE.ConeGeometry(0.03, 0.1, 16);
      const penTipMaterial = createSolidMaterial(colors.accent1);
      const penTip = new THREE.Mesh(penTipGeometry, penTipMaterial);
      penTip.position.z = 0.25;
      penTip.rotation.x = Math.PI / 2;
      penGroup.add(penTip);
      
      objects.push(penGroup);
      
      // 6. Add floating geometric shapes representing design elements
      // Torus knot - representing complex thinking
      const torusKnotGeometry = new THREE.TorusKnotGeometry(0.3, 0.08, 100, 16);
      const torusKnotMaterial = createWireframeMaterial(colors.accent3);
      const torusKnot = createFloatingObject(torusKnotGeometry, torusKnotMaterial, -1.5, 1.5, -4);
      objects.push(torusKnot);
      
      // Particles for visual interest
      const particlesGeometry = new THREE.BufferGeometry();
      const particlesCount = 1000;
      
      const posArray = new Float32Array(particlesCount * 3);
      
      for(let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 10;
      }
      
      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
      
      // Materials
      const particlesMaterial = new THREE.PointsMaterial({
        size: 0.01,
        color: 0xffffff,
        transparent: true,
        opacity: 0.6
      });
      
      // Mesh
      const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(particlesMesh);
      objects.push(particlesMesh);
      
      // Set camera position
      camera.position.z = 5;
      
      // Mouse Effect
      let mouseX = 0;
      let mouseY = 0;
      
      function onDocumentMouseMove(event) {
        mouseX = (event.clientX - window.innerWidth / 2) / 100;
        mouseY = (event.clientY - window.innerHeight / 2) / 100;
      }
      
      document.addEventListener('mousemove', onDocumentMouseMove);
      
      // Animation loop
      function animate() {
        requestAnimationFrame(animate);
        
        // Rotate particles
        particlesMesh.rotation.y += 0.0005;
        
        // Make scene react to mouse
        scene.rotation.y = mouseX * 0.08;
        scene.rotation.x = mouseY * 0.08;
        
        // Animate individual objects with unique movements
        objects.forEach((obj, index) => {
          if (obj.isGroup || obj instanceof THREE.Group) {
            // Smoother rotation for groups
            obj.rotation.x += 0.002;
            obj.rotation.y += 0.003;
          } else {
            // Individual object animations
            obj.rotation.x += 0.003 + (index * 0.0005);
            obj.rotation.y += 0.002 + (index * 0.0005);
          }
          
          // Subtle floating effect - different for each object
          if (!(obj instanceof THREE.Points)) { // Don't apply to particle system
            const floatSpeed = 0.0005 + (index * 0.0001);
            const floatDistance = 0.0008 + (index * 0.0001);
            obj.position.y += Math.sin(Date.now() * floatSpeed) * floatDistance;
          }
        });
        
        // Special animation for phone
        if (phoneGroup) {
          phoneGroup.rotation.y = Math.sin(Date.now() * 0.001) * 0.2;
        }
        
        // Special animation for grid
        if (gridGroup) {
          gridGroup.rotation.z = Math.sin(Date.now() * 0.0005) * 0.1;
        }
        
        // Special animation for wireframe
        if (wireframeModel) {
          wireframeModel.rotation.x += 0.005;
          wireframeModel.rotation.y += 0.007;
        }
        
        // Special animation for torus knot
        if (torusKnot) {
          torusKnot.rotation.x += 0.01;
          torusKnot.rotation.y += 0.01;
        }
        
        renderer.render(scene, camera);
      }
      
      animate();
      
      // Handle window resize
      window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      });
    })();
    
    // Contact form handling
    document.getElementById('contactForm').addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Thank you for your message! This is a demo form, so no message was actually sent.');
      this.reset();
    });