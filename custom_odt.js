/*
*	programado por Isaac Marco, 2019
*	isaacmarco@gmail.com
*
*/

var xml_estilos = `
<!-- estilos, se pueden incluir aqui todos los deseados -->
	<office:automatic-styles>
		<style:style style:name="Tabla1" style:family="table">
			<style:table-properties style:width="16.999cm" table:align="margins"/>
		</style:style>
		<style:style style:name="Tabla1.A" style:family="table-column">
			<style:table-column-properties style:column-width="16.999cm" style:rel-column-width="65535*"/>
		</style:style>
		<style:style style:name="Tabla1.A1" style:family="table-cell">
			<style:table-cell-properties fo:padding="0.097cm" fo:border="0.002cm solid #000000"/>
		</style:style>
	</office:automatic-styles>
	<!-- fin de los estilos -->
`;

var xml_plantilla = `<?xml version="1.0" encoding="UTF-8"?>
<office:document-content xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0" xmlns:style="urn:oasis:names:tc:opendocument:xmlns:style:1.0" xmlns:text="urn:oasis:names:tc:opendocument:xmlns:text:1.0" xmlns:table="urn:oasis:names:tc:opendocument:xmlns:table:1.0" xmlns:draw="urn:oasis:names:tc:opendocument:xmlns:drawing:1.0" xmlns:fo="urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:meta="urn:oasis:names:tc:opendocument:xmlns:meta:1.0" xmlns:number="urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0" xmlns:svg="urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0" xmlns:chart="urn:oasis:names:tc:opendocument:xmlns:chart:1.0" xmlns:dr3d="urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0" xmlns:math="http://www.w3.org/1998/Math/MathML" xmlns:form="urn:oasis:names:tc:opendocument:xmlns:form:1.0" xmlns:script="urn:oasis:names:tc:opendocument:xmlns:script:1.0" xmlns:ooo="http://openoffice.org/2004/office" xmlns:ooow="http://openoffice.org/2004/writer" xmlns:oooc="http://openoffice.org/2004/calc" xmlns:dom="http://www.w3.org/2001/xml-events" xmlns:xforms="http://www.w3.org/2002/xforms" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:rpt="http://openoffice.org/2005/report" xmlns:of="urn:oasis:names:tc:opendocument:xmlns:of:1.2" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:grddl="http://www.w3.org/2003/g/data-view#" xmlns:tableooo="http://openoffice.org/2009/table" xmlns:textooo="http://openoffice.org/2013/office" xmlns:field="urn:openoffice:names:experimental:ooo-ms-interop:xmlns:field:1.0" office:version="1.2">
	<office:scripts/>
	<office:font-face-decls>
		<style:font-face style:name="Tahoma1" svg:font-family="Tahoma"/>
		<style:font-face style:name="Times New Roman" svg:font-family="&apos;Times New Roman&apos;" style:font-family-generic="roman" style:font-pitch="variable"/>
		<style:font-face style:name="Arial" svg:font-family="Arial" style:font-family-generic="swiss" style:font-pitch="variable"/>
		<style:font-face style:name="Andale Sans UI" svg:font-family="&apos;Andale Sans UI&apos;" style:font-family-generic="system" style:font-pitch="variable"/>
		<style:font-face style:name="Tahoma" svg:font-family="Tahoma" style:font-family-generic="system" style:font-pitch="variable"/>
	</office:font-face-decls>
	
	
	
	<!-- estilos, se pueden incluir aqui todos los deseados -->
	<office:automatic-styles>
		<style:style style:name="Tabla1" style:family="table">
			<style:table-properties style:width="16.999cm" table:align="margins"/>
		</style:style>
		<style:style style:name="Tabla1.A" style:family="table-column">
			<style:table-column-properties style:column-width="16.999cm" style:rel-column-width="65535*"/>
		</style:style>
		<style:style style:name="Tabla1.A1" style:family="table-cell">
			<style:table-cell-properties fo:padding="0.097cm" fo:border="0.002cm solid #000000"/>
		</style:style>
	</office:automatic-styles>
	<!-- fin de los estilos -->
	
	
	
	<office:body>
		<office:text>
		
			<text:sequence-decls>
				<text:sequence-decl text:display-outline-level="0" text:name="Illustration"/>
				<text:sequence-decl text:display-outline-level="0" text:name="Table"/>
				<text:sequence-decl text:display-outline-level="0" text:name="Text"/>
				<text:sequence-decl text:display-outline-level="0" text:name="Drawing"/>			
			</text:sequence-decls>
		
		
		
		<!-- todo el documento ODT -->
			<vista-formidable></vista-formidable>		
		<!-- fin del documento ODT -->
			
			
			
			<text:p text:style-name="Standard"/>
		</office:text>
	</office:body>
	
	
</office:document-content>
`;

var xml_vista_formidable_tag = '<vista-formidable></vista-formidable>';

// objeto ODT permite comprimir y descomprimir
// el content.xml en el fichero odt 
var ODT = function(odt, options){	
	var zip = new JSZip(odt, options);	
	this.setXML = function(xml){
		zip.file('content.xml', xml);
	}		 
	this.getODT = function(options) {
		return zip.generate(options);
	};	
}

	
jQuery('document').ready(function () {    
	
	
    jQuery("#convert-odt").click(function () {		
        jQuery.loadScript = function (url, callback) {
            jQuery.ajax({
                url: url,
                dataType: 'script',
                success: callback,
                async: true
            });
        }
		
        if (typeof someObject == 'undefined') $.loadScript('https://cdnjs.cloudflare.com/ajax/libs/jszip/2.4.0/jszip.min.js', function () {
			
            var req = new XMLHttpRequest();
			
			// obtener el nombre de la plantilla desde el html 
			var nombreFicheroPlantilla = jQuery('div#nombre-plantilla').html();				
			
			
			
            req.open('GET','https://isaacmarco.github.io/odt/' + nombreFicheroPlantilla + '.odt'); 			 
            req.responseType = 'arraybuffer';
            
			req.addEventListener('load', function () {				
				alert('version codigo custom-odt 40');					
				
				// fichero de la plantilla descargada
				var fichero = req.response;          
				// 	creamos un odt vacio usando la plantilla 
				var odtdoc = new ODT(fichero);
				
				// incrustar aqui el XML de la vista de formidable,
				// sustituimos en la plantilla el tag <vista-formidable></vista-formidable>
				// por todo el codigo XML de la vista formidable.

				// primero obtenemos el contenido de la vista del formidable 
				var xml_vista_formidable = jQuery('div#xml-vista-formidable').html();		
				console.log(xml_vista_formidable);
				// a continuacion hacemos la sustitucion de los tag por todo el nuevo xml de la vista
				var xml_salida = xml_plantilla.replace(xml_vista_formidable_tag, xml_vista_formidable);
				
				// establecemos el content.xml y lo comprimirmos en el odt 
				odtdoc.setXML(xml_salida);
				// obtenemos el ODT ya comprimido
				var odt = odtdoc.getODT();	
				// pasamos el odt a largue binary object
				var blob = b64toBlob(odt, "application/vnd.oasis.opendocument.text");				
				// creamos el link de descarga
				CrearLinkDescarga(blob);
				
            });			
			
            req.send();
            $.loadScript('http://www3.gobiernodecanarias.org/medusa/contenidosdigitales/js/jszip/dist/jszip.min.js');
        });

    });
	
	


	
	// crear link de descarga 
	function CrearLinkDescarga(blob){		
		var link = document.createElement('a');
		link.href = URL.createObjectURL(blob);	
		link.download = jQuery('div#nombre-odt').html();
		link.appendChild(
			document.createTextNode('Haga clic aqu\u00ED si su descarga no se inici\u00F3 autom\u00E1ticamente')
		);
		var downloadArea = document.getElementById('download-area');
		downloadArea.innerHTML = '';
		downloadArea.appendChild(link);				
		// realizar descarga automaticamente
		link.click();
	}		
	
	// convertie a largue binary object
	function b64toBlob(b64Data, contentType, sliceSize) {
        contentType = contentType || '';
        sliceSize = sliceSize || 512;
        var byteCharacters = atob(b64Data);
        var byteArrays = [];
        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);
            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
            var byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
        var blob = new Blob(byteArrays, { type: contentType });
        return blob;
    }
	
});