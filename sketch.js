// 3D model of a cat
let catModel;
// Shader used to colorize the cat's coat
let catShader;
// Shader used to colorize the cat's eyes
let eyesShader;
// Graphics buffer used to render the shaders onto before applying it
// as a texture to the model.
let graphics;

// Coat texture for a striped cat (mackerel tabby)
let catStripedTexture;
// Eye texture for a striped cat
// TODO: do I need two separate eye textures?
let catStripedEyesTexture;
// Coat texture for a solid-colored cat
let catSolidTexture;
// Eye texture for a solid-colored cat
let catSolidEyesTexture;

function preload() {
  catModel = loadModel("/assets/12221_Cat_v1_l3.obj", true);

  catShader = loadShader("cat.vert", "cat.frag");
  eyesShader = loadShader("cat.vert", "eyes.frag");

  catStripedTexture = loadImage("/assets/cat_striped_bump.png");
  // catStripedTexture = loadImage("/assets/cat_striped_bump copy.jpg");
  catStripedEyesTexture = loadImage("/assets/cat_striped_eyes.png");
  catSolidTexture = loadImage("/assets/cat_solid_bump.png");
  // catSolidTexture = loadImage("/assets/cat_solid_bump copy.png");
  catSolidEyesTexture = loadImage("/assets/cat_solid_eyes.png");
}

function setup() {
  // Using degrees instead of radians like a plebeian
  angleMode(DEGREES);

  // Shaders require WEBGL mode to work
  createCanvas(800, 800, WEBGL);
  // Turn stroke off (otherwise the 3D model will have visible polygon edges)
  noStroke();

  // Initialize a new graphics layer
  graphics = createGraphics(width, height, WEBGL);
  // Turn off the createGraphics layers stroke
  graphics.noStroke();

  // Create input controls
  createRadioButtons();
}

function draw() {
  // Make the background solid grey
  background(200);

  // Disable some options based on the selected ones
  checkLocusInterdependence();
  // Read the selected options and pass them into the shader
  passLocusValuesIntoShader(catShader);

  let catTexture;
  // Select the textures based on whether the cat is going to be striped or not
  if (locusARadio.value() === LOCUS_A_OPTIONS.AGOUTI) {
    catTexture = catStripedTexture;
    catEyesTexture = catStripedEyesTexture;
  } else {
    catTexture = catSolidTexture;
    catEyesTexture = catSolidEyesTexture;
  }

  // Pass the selected coat texture into the coat shader
  catShader.setUniform("uTexture", catTexture);

  // Pass the selected eye texture into the eye shader
  // TODO: programmatically select eye color
  eyesShader.setUniform("uTexture", catEyesTexture);
  eyesShader.setUniform("uEyeColor", [0.63, 0.8, 0.94]);

  // This allows us to rotate the model (and zoom in and out) using the mouse
  orbitControl();

  // Pass the coat shader into the graphics layer
  graphics.shader(catShader);
  // Create the geometry for the coat shader to render on.
  graphics.rect(0, 0, width, height);

  // Now do the same thing with the eye shader
  graphics.shader(eyesShader);
  graphics.rect(0, 0, width, height);

  // After rendering both shaders on top of each other, pass the resulting
  // image as a texture for the model.
  texture(graphics);

  // Rotate to a better angle and make things larger.
  rotateX(70);
  rotateZ(150);
  scale(2.5);

  // Finally render the model.
  // Confusingly, you don't render the model FIRST, and THEN rotate ¯\_(ツ)_/¯
  model(catModel);

  // DEBUG
  // Draw the shader on the background plane
  // image(shaderTexture, 0, 0);
}
