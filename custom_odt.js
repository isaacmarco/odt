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
			var nombreFicheroDescarga = jQuery('div#nombre-fichero').html();
			
            req.open('GET','https://isaacmarco.github.io/odt/' + nombreFicheroPlantilla + '.odt'); 
			 
            req.responseType = 'arraybuffer';
            
			req.addEventListener('load', function () {
				
                var empty = req.response;
                var odtdoc = new ODTDocument(empty);
				
			 
			 
                try {
					
					// recoger todo el html dentro de la tabla1
                    var regex = /<table table:name=\"Tabla1\" class=\"Tabla1\">.*<\/table>/ig;
					// sustituir todos los elementos que dan problemas 
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
					
					
					// volcar el html al conversor 
                    odtdoc.setHTMLUnsafe(odtdoc.getHTMLUnsafe().replace(regex, contenido));
					
                } catch (e) {
                    alert("No se pudo generar el documento odt.");
                    throw e;
                }
				 
			 
				
                var odt = odtdoc.getODT();
                var blob = b64toBlob(odt, "application/vnd.oasis.opendocument.text");
				
				// crear link de descarga 
                var link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = jQuery('div#nombre-odt').html();
                link.appendChild(
					document.createTextNode('NOTA VERSION'));
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