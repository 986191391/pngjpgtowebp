import imagemin from 'imagemin';
import imageminWebp from 'imagemin-webp';

(async () => {
	await imagemin(['images/*.{jpg,png}'], {
		destination: 'images/build',
		plugins: [
			imageminWebp({ quality: 40 })
		]
	});

	console.log('Images optimized');
})();