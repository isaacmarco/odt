/* This file is licensed under the General Public License. */

var ODT = function(odt, options){
	alert('codigo miODT 0');
	var zip = new JSZip(odt, options);	
	
	this.setXML = function(xml){
		zip.file('content.xml', xml));
	}	
	 
	this.getODT = function(options) {
		return zip.generate(options);
	};
	
}

/*
var ODTDocument = function(odt, options) {
	
	alert('codigo miODT 4');
		
	var zip = new JSZip(odt, options);	
		
	
	var nodeToHTML = function(node, contents) {			
		return simpleElementToHTML(contents);
	};
	
	
	var documentToODT = function(html) {
		return (
			'<?xml version="1.0" encoding="UTF-8"?>\n' +
			traverse(new DOMParser().parseFromString(html, 'text/html').documentElement, nodeToODT)
			.replace(/'/g, '&apos;')
		);
	};
		
	
	
	var getDocHTML = function(doc) {
		var doctype = doc.doctype;
		var doctypeString = doctype ? '<!DOCTYPE '
			+ doctype.name
			+ (doctype.publicId ? ' PUBLIC "' + doctype.publicId + '"' : '')
			+ (!doctype.publicId && doctype.systemId ? ' SYSTEM' : '')
			+ (doctype.systemId ? ' "' + doctype.systemId + '"' : '')
			+ '>' : '';
		return doctypeString + doc.documentElement.outerHTML;
	};
	
	
	
	this.setHTMLUnsafe = function(html) {
		zip.file('content.xml', documentToODT(html));
	};
	
	
	
	this.setHTML = function(html) {
		this.setHTMLUnsafe(html);
		
		// Roundtrip check
		if(normalize(this.getHTML()) !== normalize(html)) {
			throw new Error("Couldn't generate ODT file: roundtrip failed.");
		}
	};
	
	
	this.getODT = function(options) {
		return zip.generate(options);
	};
}
*/


