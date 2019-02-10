var xml = '
<?xml version="1.0" encoding="UTF-8"?>
<office:document-content xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0" xmlns:style="urn:oasis:names:tc:opendocument:xmlns:style:1.0" xmlns:text="urn:oasis:names:tc:opendocument:xmlns:text:1.0" xmlns:table="urn:oasis:names:tc:opendocument:xmlns:table:1.0" xmlns:draw="urn:oasis:names:tc:opendocument:xmlns:drawing:1.0" xmlns:fo="urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:meta="urn:oasis:names:tc:opendocument:xmlns:meta:1.0" xmlns:number="urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0" xmlns:svg="urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0" xmlns:chart="urn:oasis:names:tc:opendocument:xmlns:chart:1.0" xmlns:dr3d="urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0" xmlns:math="http://www.w3.org/1998/Math/MathML" xmlns:form="urn:oasis:names:tc:opendocument:xmlns:form:1.0" xmlns:script="urn:oasis:names:tc:opendocument:xmlns:script:1.0" xmlns:ooo="http://openoffice.org/2004/office" xmlns:ooow="http://openoffice.org/2004/writer" xmlns:oooc="http://openoffice.org/2004/calc" xmlns:dom="http://www.w3.org/2001/xml-events" xmlns:xforms="http://www.w3.org/2002/xforms" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:rpt="http://openoffice.org/2005/report" xmlns:of="urn:oasis:names:tc:opendocument:xmlns:of:1.2" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:grddl="http://www.w3.org/2003/g/data-view#" xmlns:tableooo="http://openoffice.org/2009/table" xmlns:textooo="http://openoffice.org/2013/office" xmlns:field="urn:openoffice:names:experimental:ooo-ms-interop:xmlns:field:1.0" office:version="1.2">
	<office:scripts/>
	<office:font-face-decls>
		<style:font-face style:name="Tahoma1" svg:font-family="Tahoma"/>
		<style:font-face style:name="Times New Roman" svg:font-family="&apos;Times New Roman&apos;" style:font-family-generic="roman" style:font-pitch="variable"/>
		<style:font-face style:name="Arial" svg:font-family="Arial" style:font-family-generic="swiss" style:font-pitch="variable"/>
		<style:font-face style:name="Andale Sans UI" svg:font-family="&apos;Andale Sans UI&apos;" style:font-family-generic="system" style:font-pitch="variable"/>
		<style:font-face style:name="Tahoma" svg:font-family="Tahoma" style:font-family-generic="system" style:font-pitch="variable"/>
	</office:font-face-decls>
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
	<office:body>
		<office:text>
		
			<text:sequence-decls>
				<text:sequence-decl text:display-outline-level="0" text:name="Illustration"/>
				<text:sequence-decl text:display-outline-level="0" text:name="Table"/>
				<text:sequence-decl text:display-outline-level="0" text:name="Text"/>
				<text:sequence-decl text:display-outline-level="0" text:name="Drawing"/>			
			</text:sequence-decls>
			
			<documento></documento>		
		
			
			<text:p text:style-name="Standard"/>
		</office:text>
	</office:body>
</office:document-content>
';



jQuery('document').ready(function () {
	
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
			
			// obtener el nombre del fichero a descargar 
			//var nombreFicheroDescarga = jQuery('div#nombre-fichero').html();
			
            req.open('GET','https://isaacmarco.github.io/odt/' + nombreFicheroPlantilla + '.odt'); 			 
            req.responseType = 'arraybuffer';
            
			req.addEventListener('load', function () {
				
				alert('32');	
				
				
                var fichero = req.response;
                //var odtdoc = new ODTDocument(fichero);
				var odtdoc = new ODT(fichero);
				odtdoc.setXML(xml);
				var odt = odtdoc.getODT();
					
                var blob = b64toBlob(odt, "application/vnd.oasis.opendocument.text");
				
							
							
				
					/*
                try {
					
					
					// tomar el texto comprendido dentro de taba1 
					 
					var rx = /<documento><\/documento>/ig;
					var texto = $('#contenido').val();
					odtdoc.setHTMLUnsafe(odtdoc.getHTMLUnsafe().replace(rx, texto)); 
					
				 
                    var regex = /<table table:name=\"Tabla1\" class=\"Tabla1\">.*<\/table>/ig;					 
                    var contenido = $('#contenido').val().replace(/&feature=youtube.be/g, "");					
                    contenido = contenido.replace(/&/g, "");
                    contenido = contenido.replace(/<b>/g, "<span class=\"T13\">");
                    contenido = contenido.replace(/<\/b>/g, "<\/span>");
                    contenido = contenido.replace(/<em>/g, "<span class=\"T14\">");
                    contenido = contenido.replace(/<\/em>/g, "<\/span>");
                    contenido = contenido.replace(/<br \/>/g, " ");
                    contenido = contenido.replace(/<ol>/g, "");
                    contenido = contenido.replace(/<\/ol>/g, "");
                    contenido = contenido.replace(/<ul>/g, "");
                    contenido = contenido.replace(/<\/ul>/g, "");
                    contenido = contenido.replace(/<li>/g, "<p>    • ");
                    contenido = contenido.replace(/<\/li>/g, "<\/p>");
                    contenido = contenido.replace(/<p> <\/p>/g, "");
					odtdoc.setHTMLUnsafe(odtdoc.getHTMLUnsafe().replace(regex, contenido));  
					 
					 
					//console.log(odtdoc.getHTMLUnsafe());
					//alert( odtdoc.getHTMLUnsafe() );
					 
					
                } catch (e) {
				 
                    alert("No se pudo generar el documento odt.");	
				 
					console.log(odtdoc.getHTMLUnsafe());
					console.log(e);  
                    throw e;
                } */
			 
				
                //var odt = odtdoc.getODT();
				
				
				
			
				
				// crear link de descarga 
                var link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = jQuery('div#nombre-odt').html();
                link.appendChild(
					document.createTextNode('Haga clic aqu\u00ED si su descarga no se inici\u00F3 autom\u00E1ticamente'));
                var downloadArea = document.getElementById('download-area');
                downloadArea.innerHTML = '';
                downloadArea.appendChild(link);
				
				// realizar descarga automaticamente
                link.click();
            });
			
			
            req.send();
            $.loadScript('http://www3.gobiernodecanarias.org/medusa/contenidosdigitales/js/jszip/dist/jszip.min.js');
        });

    });
	
	
	
	
});