import Debug from '../lib/Debug.js';
import Fonts from '../lib/Fonts.js';
import Images from '../lib/Images.js';
import Input from '../lib/Input.js';
import Sounds from '../lib/Sounds.js';
import StateMachine from '../lib/StateMachine.js';
import Timer from '../lib/Timer.js';

export const canvas = document.createElement('canvas');
export const context =
	canvas.getContext('2d') || new CanvasRenderingContext2D();
const assetDefinition = await fetch('./config/assets.json').then((response) =>
	response.json()
);

export const CANVAS_WIDTH = 384;
export const CANVAS_HEIGHT = 208;

const resizeCanvas = () => {
	const scaleX = window.innerWidth / CANVAS_WIDTH;
	const scaleY = window.innerHeight / CANVAS_HEIGHT;
	const scale = Math.min(scaleX, scaleY); // Maintain aspect ratio

	canvas.style.width = `${CANVAS_WIDTH * scale}px`;
	canvas.style.height = `${CANVAS_HEIGHT * scale}px`;
};

// Listen for canvas resize events
window.addEventListener('resize', resizeCanvas);

resizeCanvas(); // Call once to scale initially

export const input = new Input(canvas);
export const images = new Images(context);
export const fonts = new Fonts();
export const stateMachine = new StateMachine();
export const timer = new Timer();
export const sounds = new Sounds();
export const debug = new Debug();

// Load all the assets from their definitions.
sounds.load(assetDefinition.sounds);
images.load(assetDefinition.images);
fonts.load(assetDefinition.fonts);

// If true, render all hitboxes.
export const DEBUG = false;
