import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import jszip from 'jszip';
import cheerio from 'cheerio';
//import FileInput from 'react-file-input';

import { arrangeZip } from './arr'; 
import {b64toBlob} from './blob';

import ReactHtmlParser from 'react-html-parser';

class App extends Component{
	constructor(props){
		super(props);
		this.handleFile = this.handleFile.bind(this);
		this.state = {b:'',images:[],html:[],opf:[]};
		this.renderInt = 0;
	}
	render(){
		//console.log(this.state.tree);
		var temparr = ['one.jpg','two.jpeg'];
		console.log(this.state.images.length);
		console.log(this.state.html.length);
		// this.state.tree.forEach(function(elm){
		// 	//console.log(elm);
		// });
		// var imgList = this.state.tree.map((elm,indx) =>
		// 	 <img key={indx} src={elm.blobUrl}/>
		// );
		console.log(this.renderInt);
		var prevRenderInt = this.renderInt;
		this.renderInt = prevRenderInt+1;
		var value = 'there is nothing';
		var opfValue = "no OPF";
		if(this.state.html.length>0){
			value = this.state.html[1].cont;
			value = value.replace(/epub:/g,'s');
			var $ = cheerio.load(value);
			//$()
			// value = value.split(/<body/g);
			// console.log(value);
			// var doc = $('<html>').append(value[1]);
				//document.createElement('html'),nodes;
				//doc.innerHTML = value;
				//value = ReactHtmlParser(
				//console.log(doc.getElementsByTagName('body')[0].getElementsByTagName('epub:type'));
			
			$('[stype]').removeAttr('stype');
			console.log($('[stype]'));
			value = $('body').html();
			// console.log(value);
			value = ReactHtmlParser(value);
				//nodes = [].slice.call(doc.childNodes);
				//value.split('<body');
				//value = value[1];
				//console.log(nodes);
		}
		if(this.state.opf.length>0)
			opfValue = this.state.opf.cont;
		return(
			<div>
				<h1>Hello World</h1>
				<input type="file" name="file" onChange={this.handleFile}/>
				<div>
					{value}
				</div>
			</div>

			//(\"[a-z])\w\D+)
		);
	}

	handleFile(e){
		var self = this;
		//console.log(e.target.files);
		// var zip = new jszip();
		// zip.loadAsync(e.target.files[0]).then(function(data){
		// 	console.log(data);
		// },function(err){

		// });	
		// var imgPath = {images:[]};

		var pro = arrangeZip(e.target.files[0]);
		// .then(function(){
		// 	self.setState({img:imgPath});
		// },function(err){

		// });
		// pro.then(function(cont){
		// 	console.log(cont);
		// 	console.log('it in');
		// 	//var imgpt = imgPath;
		// 	//console.log(imgPath);
		// 	//self.setState({tree:imgpt});
		// },function(err){});
		console.log(pro);
		pro.then(function(value){
			//console.log(value);
			var images = [];
			var htmlString = [];
			var opfString = {};
			var cssString = [];
			var folders = {};
			for (var i = 0; i < value.length; i++) {
				if(value[i].type == 'image'){
					var blob = b64toBlob(value[i].cont,'image/jpg');
					var blobUrl = URL.createObjectURL(blob);
					var imgBlob = {blob:blob,blobUrl:blobUrl,url:value[i].name};
					images.push(imgBlob);

					//console.log(value[i].name);
				}
				else if(value[i].type == 'html'){
					htmlString.push(value[i]);
					var path = value[i].name.split('/');
					if(path.length>1){
						var pathObj = path[path.length - 1];
						for (var j = path.length - 2; j >= 0; j--) {
							var f = pathObj;
							pathObj = {};
							pathObj[path[j]] = f; 
						}
						var thispath = '';
						for (var i = 0; i < path.length-1; i++) {
							path[i];
							if(folders[])
						}
						console.log(pathObj);
					}
				}
				else if(value[i].type == 'opf'){
					var parser = new DOMParser();
				    var xmlDoc = parser.parseFromString(value[i].cont, "text/xml");
					//console.log(xmlDoc.getElementsByTagName("item")[1]);
					opfString = value[i];
				}
				else if(value[i].type == 'css'){
					cssString.push(value[i]);
				}
				else if(value[i].type == 'xml'){
					var parser = new DOMParser();
				    var xmlDoc = parser.parseFromString(value[i].cont, "text/xml");
					console.log(xmlDoc);
				}
			}
			//self.setState({images:images,html:htmlString,opf:opfString,css:cssString});
		},function(err){});
	}
}
ReactDOM.render(<App />, document.getElementById('root'));
// var zip = new jszip();
// zip.loadAsync('/mpython.epub').then(function(data){
// 	console.log(data);
// },function(err){
// 	console.log(err);
// });
// var zip = new AdmZip('./mpython.epub');
// var zipEntries = zip.getEntries();
// zipEntries.forEach(function(zipEntry) {
// 	console.log(zipEntry.toString()); // outputs zip entries information 
// });

//console.log(zipEntries);



// var self = this;
// var zip = new jszip();
// zip.loadAsync(e.target.files[0]).then(function(data){
// 	data.file("OPS/images/c01f001.jpg").async("base64").then(function(cont){
// 		var blob = b64toBlob(cont, 'image/jpg');
// 		var blobUrl = URL.createObjectURL(blob);
// 		console.log(blobUrl);
// 		self.setState({b:blobUrl});
// 	},function(err){
// 		console.log(err);
// 	});
// },function(err){
// 	console.log(err);
// });