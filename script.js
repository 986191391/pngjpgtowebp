import imagemin from 'imagemin';
import imageminWebp from 'imagemin-webp';
import ReadLine from 'readline';

const readline = ReadLine.createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.question(`请输入转换质量(1-100)：`, (quality = 50) => {
  if (!quality) quality = 50;
  if (quality < 1 || quality > 100) {
    console.log('请输入正确的转换质量！');
    return readline.close();
  }
  console.log(`--------转换中...--------`);
  transImage(quality);
  readline.close();
});

async function transImage (quality) {
	await imagemin(['images/*.{jpg,jpeg,png}'], {
		destination: 'images/build',
		plugins: [
			imageminWebp({ quality: quality })
		]
	});

  console.log(`--------转换完成！--------`);
}