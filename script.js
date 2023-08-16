import imagemin from 'imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant'; 
import imageminWebp from 'imagemin-webp';
import ReadLine from 'readline';

const readline = ReadLine.createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.question('请选择执行模式 -压缩图片(y), -格式转换Webp(t)。', (model = 'y') => {
  if (model === 't') {
    readline.question('请输入图片转换质量(1-100)：', (quality = 50) => {
      if (!quality) quality = 50;
      if (quality < 1 || quality > 100) {
        console.log('请输入正确的转换质量！');
        return readline.close();
      }
      console.log(`--------转换中...--------`);
      transToWebp();
      readline.close();
    })
  } else {
    readline.question('请输入压缩质量(1-100)：', (quality = 50) => {
      if (!quality) quality = 50;
      if (quality < 1 || quality > 100) {
        console.log('请输入正确的压缩质量！');
        return readline.close();
      }
      console.log(`--------压缩中...--------`);
      compress(quality);
      readline.close();
    })
  }
});

// 压缩图片
async function compress (quality) {
	await imagemin(['images/*.{jpg,jpeg,png}'], {
		destination: 'images/build',
		plugins: [
      imageminPngquant({ quality: [0.4, 0.8] }),
      imageminMozjpeg({ quality: quality })
		]
	});

  console.log(`--------压缩完成！--------`);
}

// 转换为webp格式
async function transToWebp (quality) {
	await imagemin(['images/*.{jpg,jpeg,png}'], {
		destination: 'images/build',
		plugins: [
			imageminWebp({ quality: quality })
		]
	});

  console.log(`--------转换完成！--------`);
}