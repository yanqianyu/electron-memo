const storeFile = async (upload) => {
	const {filename, createReadStream, mimetype} = await upload.then(res => res);
	const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {bucketName: 'files'});
	const uploadStream = bucket.openUploadStream(filename, {
		contentType: mimetype
	});

	return new Promise((resolve, reject) => {
		createReadStream()
			.pipe(uploadStream)
			.on('error', reject)
			.on('finish', () => {
				resolve(uploadStream.id)
			})
	})
};

module.exports = {storeFile};
