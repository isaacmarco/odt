/*
*	Formidable-ODT-tool
*	Programado por Isaac Marco, 2019
*	isaacmarco@gmail.com
*	
*	El proposito de este script es escribir en el content.xml de un 
*	fichero odt de OpenOffice todo el XML que genere una vista del 
*	wordpress Formidable. 	
*
*	
*	El cuerpo del content.xml se genera todo desde el div id = "xml-vista-formidable",
*	generando todo el content.xml completo. Por lo tanto, el XML que escriba
*	en la vista formidable debe incluir todo el contenido del content.xml 
*	del fichero odt que ha utilizado como plantilla. 
*
*	La cabecera y las imagenes ya se encuentran en la plantilla odt 
*	que debe estar subida al servidor
*/



// objeto ODT permite comprimir y descomprimir
// el content.xml y el styles.xml en el fichero odt 
var ODTContent = function(odt, options){	
	var zip = new JSZip(odt, options);	
	this.setXML = function(contentXML){ 
		zip.file('content.xml', contentXML);
	}		 
	this.getODT = function(options) {
		return zip.generate(options);
	};	
}


// eliminar los tags <p></p> que formidable introduce
// automaticamente en los campos de formulario de tipo parrafo
function LimpiarCamposParrafo(contenidoXML){
	return contenidoXML.replace(/<p>|<\/p>/g, '');
}


// elimina las tildes de los nombres de los ficheros png
// que estan almacenados en wordpress.
function EliminarTildes(contenidoXML) {
    return contenidoXML.normalize('NFD').replace(/[\u0300-\u036f]/g,"").toLowerCase();		
}


	
jQuery('document').ready(function () {    
	
	
	console.log('version codigo custom-odt-tool 4');
		
		
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
			
			// obtener el nombre del fichero contenedor del que se obtendran
			// el styles.xml y el content.xml desde la vista formidable 
			var urlFicheroODT = jQuery('div#url-odt').html();				
						
			// abrimos el fichero
			// TODO: LA URL DE LA PLANTILLA DEBERIA IR EN LA VISTA PARA
			// SER MAS GENERAL 
			// req.open('GET',urlFicheroODT); 	
            req.open('GET','https://isaacmarco.github.io/odt/' + urlFicheroODT + '.odt'); 			 
            req.responseType = 'arraybuffer';
            
			req.addEventListener('load', function () {				
					
				
				// fichero de la plantilla descargada
				var ficheroContenedor = req.response;          
				// 	obtenemos un content y un styles xml vacios desde el fichero 
				var odtdoc = new ODTContent(ficheroContenedor);						
								
				// obtenemos el contenido de la vista del formidable 
				var xml_content = jQuery('#xml-vista-formidable').val();	
					
				// limpiar los tags <p></p> de los campos de parrafo
				// de formidable
				xml_content = LimpiarCamposParrafo(xml_content);
				
							
				// volcamos todo el XML de la vista formidable en el content.xml,
				// se usaran la configuracion de cabeceras y pies de paginas
				// que tiene el styles.xml dentro de la plantilla odt que ha 
				// seleccionado en el servidor
				odtdoc.setXML(xml_content);				
				 
				
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
		link.download = jQuery('div#nombre-descarga').html();
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