d.push({
	img: 'http://1.com/1.jpg@js=' + $.toString(()=>{
		let javaImport = new JavaImporter();
		javaImport.importPackage(
			Packages.com.example.hikerview.utils
		);
		with(javaImport) {
			let bytes = FileUtil.toBytes(input);
			//decryptData为解密方法
			bytes = decryptData(bytes);
			return FileUtil.toInputStream(bytes);
		}
	})
})
