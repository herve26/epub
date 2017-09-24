import jszip from 'jszip';

export function arrangeZip(path){
	var promise = [];
	var zip = new jszip();
	var imgExt = ['png','jpg','jpeg'];
	var htmlExt = ['xhtml','html'];
	return zip.loadAsync(path).then(function(data){
		//return Promise.all(
		console.log(data);
		data.forEach(function(relpath,file){
			//console.log(file);
			var ext = file.name.split('.');
			ext = ext[ext.length-1];
			var contentType = '';
			var dataType = '';
			if(!!~imgExt.indexOf(ext)){
				dataType = 'base64';
				contentType = 'image/'+ext;
				promise.push(file.async(dataType).then(function(cont){
					return new Promise(function(resolve,reject){
						resolve({cont:cont,name:file.name,type:'image'});
					});
				},function(err){
					reject(err);
				}));
			}
			else if(!!~htmlExt.indexOf(ext)){
				promise.push(file.async('string').then(function(cont){
					return new Promise(function(resolve,reject){
						resolve({cont:cont,name:file.name,type:'html'});
					});
				},function(err){
					reject(err);
				}));
			}
			else if(!!~['opf'].indexOf(ext)){
				promise.push(file.async('string').then(function(cont){
					return new Promise(function(resolve,reject){
						resolve({cont:cont,name:file.name,type:'opf'});
					});
				},function(err){
					reject(err);
				}));
			}
			else if(!!~['css'].indexOf(ext)){
				promise.push(file.async('string').then(function(cont){
					return new Promise(function(resolve,reject){
						resolve({cont:cont,name:file.name,type:'style'});
					});
				},function(err){
					reject(err);
				}));
			}
			else if(!!~['xml'].indexOf(ext)){
				promise.push(file.async('string').then(function(cont){
					return new Promise(function(resolve,reject){
						resolve({cont:cont,name:file.name,type:'xml'});
					});
				},function(err){
					reject(err);
				}));
			}
		});
		return Promise.all(promise);
	},function(err){

	});	

	//return promise;
}