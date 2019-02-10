var ODT = function(odt, options){
	//alert('version codigo miODT 0');
	var zip = new JSZip(odt, options);	
	
	this.setXML = function(xml){
		zip.file('content.xml', xml);
	}	
	 
	this.getODT = function(options) {
		return zip.generate(options);
	};	
}


