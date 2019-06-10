/*
*	Formidable-ODT
*	Programado por Isaac Marco, 2019
*	isaacmarco@gmail.com
*	
*	El proposito de este script es escribir en el content.xml de un 
*	fichero odt de OpenOffice todo el XML que genere una vista del 
*	wordpress Formidable. El script tambien escribe el styles.xml, 
*	utilizando para ello una definicion del fichero completa incluida
* 	en este script. La definicion de este styles.xml incluye la 
*	cabecera.
*	
*	La cabecera se recoge desde el div id = "cabecera-vista-formidable" 
*	en la vista de formidable, y se inserta en el style.xml incluido 
*	en este script reemplazando el contenido del tag <cabecera/>. Lo 
*	mismo ocurre con el pie de pagina, que usa el tag <pie/>.
*
*	Para poner la pagina en vertical o en horizontal alterarmos 
*	el valor de las etiquetas <configuracion-pagina/><ancho-pagina/><alto-pagina/>
*	del styles.xml incluido en este script. Es en la visa de formidable
*	donde se indica si la pagina es en horizontal mediante un <div id="pagina-apaisada"/>
*	
*	El cuerpo del content.xml se genera todo desde el div id = "xml-vista-formidable",
*	generando todo el content.xml completo. Por lo tanto, el XML que escriba
*	en la vista formidable debe incluir todo el contenido del content.xml 
*	del fichero odt que ha utilizado como plantilla. 
*/



var xml_styles_plantilla = `<?xml version="1.0" encoding="UTF-8"?>
<office:document-styles xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0" xmlns:style="urn:oasis:names:tc:opendocument:xmlns:style:1.0" xmlns:text="urn:oasis:names:tc:opendocument:xmlns:text:1.0" xmlns:table="urn:oasis:names:tc:opendocument:xmlns:table:1.0" xmlns:draw="urn:oasis:names:tc:opendocument:xmlns:drawing:1.0" xmlns:fo="urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:meta="urn:oasis:names:tc:opendocument:xmlns:meta:1.0" xmlns:number="urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0" xmlns:svg="urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0" xmlns:chart="urn:oasis:names:tc:opendocument:xmlns:chart:1.0" xmlns:dr3d="urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0" xmlns:math="http://www.w3.org/1998/Math/MathML" xmlns:form="urn:oasis:names:tc:opendocument:xmlns:form:1.0" xmlns:script="urn:oasis:names:tc:opendocument:xmlns:script:1.0" xmlns:ooo="http://openoffice.org/2004/office" xmlns:ooow="http://openoffice.org/2004/writer" xmlns:oooc="http://openoffice.org/2004/calc" xmlns:dom="http://www.w3.org/2001/xml-events" xmlns:rpt="http://openoffice.org/2005/report" xmlns:of="urn:oasis:names:tc:opendocument:xmlns:of:1.2" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:grddl="http://www.w3.org/2003/g/data-view#" xmlns:tableooo="http://openoffice.org/2009/table" xmlns:textooo="http://openoffice.org/2013/office" office:version="1.2">
	<office:font-face-decls>
		<style:font-face style:name="Tahoma1" svg:font-family="Tahoma"/>
		<style:font-face style:name="Times New Roman" svg:font-family="&apos;Times New Roman&apos;" style:font-family-generic="roman" style:font-pitch="variable"/>
		<style:font-face style:name="Arial" svg:font-family="Arial" style:font-family-generic="swiss" style:font-pitch="variable"/>
		<style:font-face style:name="Andale Sans UI" svg:font-family="&apos;Andale Sans UI&apos;" style:font-family-generic="system" style:font-pitch="variable"/>
		<style:font-face style:name="Tahoma" svg:font-family="Tahoma" style:font-family-generic="system" style:font-pitch="variable"/>
	</office:font-face-decls>
	
	<office:styles>
		<style:default-style style:family="graphic">
			<style:graphic-properties fo:wrap-option="no-wrap" draw:shadow-offset-x="0.3cm" draw:shadow-offset-y="0.3cm" draw:start-line-spacing-horizontal="0.283cm" draw:start-line-spacing-vertical="0.283cm" draw:end-line-spacing-horizontal="0.283cm" draw:end-line-spacing-vertical="0.283cm" style:flow-with-text="false"/>
			<style:paragraph-properties style:text-autospace="ideograph-alpha" style:line-break="strict" style:writing-mode="lr-tb" style:font-independent-line-spacing="false">
				<style:tab-stops/>
			</style:paragraph-properties>
			<style:text-properties style:use-window-font-color="true" fo:font-size="12pt" fo:language="de" fo:country="DE" style:letter-kerning="true" style:font-size-asian="12pt" style:language-asian="ja" style:country-asian="JP" style:font-size-complex="12pt" style:language-complex="fa" style:country-complex="IR"/>
		</style:default-style>
		<style:default-style style:family="paragraph">
			<style:paragraph-properties fo:hyphenation-ladder-count="no-limit" style:text-autospace="ideograph-alpha" style:punctuation-wrap="hanging" style:line-break="strict" style:tab-stop-distance="1.245cm" style:writing-mode="page"/>
			<style:text-properties style:use-window-font-color="true" style:font-name="Times New Roman" fo:font-size="12pt" fo:language="de" fo:country="DE" style:letter-kerning="true" style:font-name-asian="Andale Sans UI" style:font-size-asian="12pt" style:language-asian="ja" style:country-asian="JP" style:font-name-complex="Tahoma" style:font-size-complex="12pt" style:language-complex="fa" style:country-complex="IR" fo:hyphenate="false" fo:hyphenation-remain-char-count="2" fo:hyphenation-push-char-count="2"/>
		</style:default-style>
		<style:default-style style:family="table">
			<style:table-properties table:border-model="collapsing"/>
		</style:default-style>
		<style:default-style style:family="table-row">
			<style:table-row-properties fo:keep-together="auto"/>
		</style:default-style>
		<style:style style:name="Standard" style:family="paragraph" style:class="text">
			<style:text-properties fo:language="zxx" fo:country="none" style:language-asian="zxx" style:country-asian="none" style:language-complex="zxx" style:country-complex="none"/>
		</style:style>
		<style:style style:name="Heading" style:family="paragraph" style:parent-style-name="Standard" style:next-style-name="Text_20_body" style:class="text">
			<style:paragraph-properties fo:margin-top="0.423cm" fo:margin-bottom="0.212cm" fo:keep-with-next="always"/>
			<style:text-properties style:font-name="Arial" fo:font-size="14pt" style:font-name-asian="Andale Sans UI" style:font-size-asian="14pt" style:font-name-complex="Tahoma" style:font-size-complex="14pt"/>
		</style:style>
		<style:style style:name="Text_20_body" style:display-name="Text body" style:family="paragraph" style:parent-style-name="Standard" style:class="text">
			<style:paragraph-properties fo:margin-top="0cm" fo:margin-bottom="0.212cm"/>
		</style:style>
		<style:style style:name="List" style:family="paragraph" style:parent-style-name="Text_20_body" style:class="list">
			<style:text-properties style:font-name-complex="Tahoma1"/>
		</style:style>
		<style:style style:name="Caption" style:family="paragraph" style:parent-style-name="Standard" style:class="extra">
			<style:paragraph-properties fo:margin-top="0.212cm" fo:margin-bottom="0.212cm" text:number-lines="false" text:line-number="0"/>
			<style:text-properties fo:font-size="12pt" fo:font-style="italic" style:font-size-asian="12pt" style:font-style-asian="italic" style:font-name-complex="Tahoma1" style:font-size-complex="12pt" style:font-style-complex="italic"/>
		</style:style>
		<style:style style:name="Index" style:family="paragraph" style:parent-style-name="Standard" style:class="index">
			<style:paragraph-properties text:number-lines="false" text:line-number="0"/>
			<style:text-properties style:font-name-complex="Tahoma1"/>
		</style:style>
		<style:style style:name="Header" style:family="paragraph" style:parent-style-name="Standard" style:class="extra">
			<style:paragraph-properties text:number-lines="false" text:line-number="0">
				<style:tab-stops>
					<style:tab-stop style:position="8.498cm" style:type="center"/>
					<style:tab-stop style:position="16.999cm" style:type="right"/>
				</style:tab-stops>
			</style:paragraph-properties>
		</style:style>
		<style:style style:name="Graphics" style:family="graphic">
			<style:graphic-properties text:anchor-type="paragraph" svg:x="0cm" svg:y="0cm" style:wrap="none" style:vertical-pos="top" style:vertical-rel="paragraph" style:horizontal-pos="center" style:horizontal-rel="paragraph"/>
		</style:style>
		<text:outline-style style:name="Outline">
			<text:outline-level-style text:level="1" style:num-format="">
				<style:list-level-properties text:list-level-position-and-space-mode="label-alignment">
					<style:list-level-label-alignment text:label-followed-by="listtab" text:list-tab-stop-position="0.762cm" fo:text-indent="-0.762cm" fo:margin-left="0.762cm"/>
				</style:list-level-properties>
			</text:outline-level-style>
			<text:outline-level-style text:level="2" style:num-format="">
				<style:list-level-properties text:list-level-position-and-space-mode="label-alignment">
					<style:list-level-label-alignment text:label-followed-by="listtab" text:list-tab-stop-position="1.016cm" fo:text-indent="-1.016cm" fo:margin-left="1.016cm"/>
				</style:list-level-properties>
			</text:outline-level-style>
			<text:outline-level-style text:level="3" style:num-format="">
				<style:list-level-properties text:list-level-position-and-space-mode="label-alignment">
					<style:list-level-label-alignment text:label-followed-by="listtab" text:list-tab-stop-position="1.27cm" fo:text-indent="-1.27cm" fo:margin-left="1.27cm"/>
				</style:list-level-properties>
			</text:outline-level-style>
			<text:outline-level-style text:level="4" style:num-format="">
				<style:list-level-properties text:list-level-position-and-space-mode="label-alignment">
					<style:list-level-label-alignment text:label-followed-by="listtab" text:list-tab-stop-position="1.524cm" fo:text-indent="-1.524cm" fo:margin-left="1.524cm"/>
				</style:list-level-properties>
			</text:outline-level-style>
			<text:outline-level-style text:level="5" style:num-format="">
				<style:list-level-properties text:list-level-position-and-space-mode="label-alignment">
					<style:list-level-label-alignment text:label-followed-by="listtab" text:list-tab-stop-position="1.778cm" fo:text-indent="-1.778cm" fo:margin-left="1.778cm"/>
				</style:list-level-properties>
			</text:outline-level-style>
			<text:outline-level-style text:level="6" style:num-format="">
				<style:list-level-properties text:list-level-position-and-space-mode="label-alignment">
					<style:list-level-label-alignment text:label-followed-by="listtab" text:list-tab-stop-position="2.032cm" fo:text-indent="-2.032cm" fo:margin-left="2.032cm"/>
				</style:list-level-properties>
			</text:outline-level-style>
			<text:outline-level-style text:level="7" style:num-format="">
				<style:list-level-properties text:list-level-position-and-space-mode="label-alignment">
					<style:list-level-label-alignment text:label-followed-by="listtab" text:list-tab-stop-position="2.286cm" fo:text-indent="-2.286cm" fo:margin-left="2.286cm"/>
				</style:list-level-properties>
			</text:outline-level-style>
			<text:outline-level-style text:level="8" style:num-format="">
				<style:list-level-properties text:list-level-position-and-space-mode="label-alignment">
					<style:list-level-label-alignment text:label-followed-by="listtab" text:list-tab-stop-position="2.54cm" fo:text-indent="-2.54cm" fo:margin-left="2.54cm"/>
				</style:list-level-properties>
			</text:outline-level-style>
			<text:outline-level-style text:level="9" style:num-format="">
				<style:list-level-properties text:list-level-position-and-space-mode="label-alignment">
					<style:list-level-label-alignment text:label-followed-by="listtab" text:list-tab-stop-position="2.794cm" fo:text-indent="-2.794cm" fo:margin-left="2.794cm"/>
				</style:list-level-properties>
			</text:outline-level-style>
			<text:outline-level-style text:level="10" style:num-format="">
				<style:list-level-properties text:list-level-position-and-space-mode="label-alignment">
					<style:list-level-label-alignment text:label-followed-by="listtab" text:list-tab-stop-position="3.048cm" fo:text-indent="-3.048cm" fo:margin-left="3.048cm"/>
				</style:list-level-properties>
			</text:outline-level-style>
		</text:outline-style>
		<text:notes-configuration text:note-class="footnote" style:num-format="1" text:start-value="0" text:footnotes-position="page" text:start-numbering-at="document"/>
		<text:notes-configuration text:note-class="endnote" style:num-format="i" text:start-value="0"/>
		<text:linenumbering-configuration text:number-lines="false" text:offset="0.499cm" style:num-format="1" text:number-position="left" text:increment="5"/>
	</office:styles>
	
	
	<office:automatic-styles>
		<style:style style:name="Mfr1" style:family="graphic" style:parent-style-name="Graphics">
			<style:graphic-properties style:vertical-pos="from-top" style:vertical-rel="paragraph" style:horizontal-pos="from-left" style:horizontal-rel="paragraph" style:mirror="none" fo:clip="rect(0cm, 0cm, 0cm, 0cm)" draw:luminance="0%" draw:contrast="0%" draw:red="0%" draw:green="0%" draw:blue="0%" draw:gamma="100%" draw:color-inversion="false" draw:image-opacity="100%" draw:color-mode="standard"/>
		</style:style>
		
		<!-- aqui se puede definir si es print-orientation="portrait" o print-orientation="landscape" -->
		<style:page-layout style:name="Mpm1">
			<style:page-layout-properties fo:page-width="<ancho-pagina/>" fo:page-height="<alto-pagina/>" style:num-format="1" style:print-orientation="<configuracion-pagina/>" fo:margin-top="2cm" fo:margin-bottom="2cm" fo:margin-left="2cm" fo:margin-right="2cm" style:writing-mode="lr-tb" style:footnote-max-height="0cm">
				<style:footnote-sep style:width="0.018cm" style:distance-before-sep="0.101cm" style:distance-after-sep="0.101cm" style:adjustment="left" style:rel-width="25%" style:color="#000000"/>
			</style:page-layout-properties>
			<style:header-style>
				<style:header-footer-properties fo:min-height="0cm" fo:margin-bottom="0.499cm"/>
			</style:header-style>
			<style:footer-style/>
		</style:page-layout>
		
		<!-- pie de pagina -->
		<style:style style:name="ESTILO_PIE_PAGINA" style:family="paragraph" style:parent-style-name="Footer">
			<style:paragraph-properties fo:text-align="end" style:justify-single-word="false"/>
			<style:text-properties style:font-name="Arial"/>
		</style:style>
	</office:automatic-styles>
	
	<office:master-styles>	
		<style:master-page style:name="Standard" style:page-layout-name="Mpm1">		
			<!-- cabecera en vertical -->
			<style:header>
				<text:p text:style-name="Header">
					<draw:frame draw:style-name="Mfr1" draw:name="gráficos1" text:anchor-type="paragraph" svg:x="-2.223cm" svg:y="-2cm" svg:width="<ancho-cabecera/>" svg:height="<alto-cabecera/>" draw:z-index="0">
						<draw:image xlink:href="<cabecera/>" xlink:type="simple" xlink:show="embed" xlink:actuate="onLoad" draw:filter-name="&lt;Todos los formatos&gt;"/>
					</draw:frame>
				</text:p>
			</style:header>	
			
			<!-- pie de pagina -->
			<style:footer>
				<text:p text:style-name="ESTILO_PIE_PAGINA">SA<SA/>_Recurso<pie/> | <text:page-number text:select-page="current">1</text:page-number> página </text:p>
				</text:p>
			</style:footer>					
		</style:master-page>		
	</office:master-styles>	
	
</office:document-styles>
`;

// variables para identificar cada tag en la plantilla XML 
// anteriormente definida
var xml_cabecera_tag = '<cabecera/>';
var xml_pie_tag = '<pie/>';
var xml_pie_SA_tag = '<SA/>';
var xml_configuracion_pagina_tag = '<configuracion-pagina/>';
var xml_ancho_pagina_tag = '<ancho-pagina/>';
var xml_alto_pagina_tag = '<alto-pagina/>';
var xml_ancho_cabecera_tag = '<ancho-cabecera/>';
var xml_alto_cabecera_tag = '<alto-cabecera/>';


// objeto ODT permite comprimir y descomprimir
// el content.xml y el styles.xml en el fichero odt 
var ODTContent = function(odt, options){	
	var zip = new JSZip(odt, options);	
	this.setXML = function(contentXML, stylesXML){
		zip.file('content.xml', contentXML);
		zip.file('styles.xml', stylesXML);
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



// elimina las medidas 150x150 de la url del campo imagen 
// para que no se utilicen las imagen en miniatura del wordpress
function LimpiarCamposImagen(contenidoXML){
	return contenidoXML.replace(/-150x150.jpg/g, '.jpg');
}


// funcion para desactivar un campo opcional concreto mediante
// su tag
function ActivarTagOpcional(contenidoXML, tag){
	// la expresion regular tiene la forma => /<tag>|<\/tag>/
	// montamos la cadena para la expresion regular 	
	var cadena = '<' + tag + '>|</' + tag + '>';
	console.log('activando campo adicional' + cadena);
	var expresion = new RegExp(cadena, 'g');
	return contenidoXML.replace( expresion, '');
}


// elimina las tildes de los nombres de los ficheros png
// que estan almacenados en wordpress.
function EliminarTildes(contenidoXML) {
    return contenidoXML.normalize('NFD').replace(/[\u0300-\u036f]/g,"").toLowerCase();	
	/*
	// Elimina los diacríticos de un texto excepto si es una "ñ" (ES6)
	function eliminarDiacriticosEs(texto) {
    return texto
           .normalize('NFD')
           .replace(/([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi,"$1")
           .normalize();
	}
	*/
}


// activa los campos etiquetados entre <opcional></opcional>
// para que se muestren en la plantilla. Por defecto los campos 
// adicionales no se muestran. Esta funcion elimina los tags
// para que sean visibles
//function ActivarCamposOpcionales(contenidoXML){	
//	return  contenidoXML.replace(/<opcional>|<\/opcional>/g, '');	
//}

	
jQuery('document').ready(function () {    
	
	
	console.log('version codigo custom-odt 140');
		
		
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
			var nombreFicheroContenedor = jQuery('div#nombre-contenedor').html();				
						
			// abrimos el fichero 
            req.open('GET','https://isaacmarco.github.io/odt/' + nombreFicheroContenedor + '.odt'); 			 
            req.responseType = 'arraybuffer';
            
			req.addEventListener('load', function () {				
					
				
				// fichero de la plantilla descargada
				var ficheroContenedor = req.response;          
				// 	obtenemos un content y un styles xml vacios desde el fichero 
				var odtdoc = new ODTContent(ficheroContenedor);
							
				
		
			
				// recuperar el id de la actividad (el numero de recurso)
				var id_actividad = jQuery('div#id-actividad').html();
				var id_sa = jQuery('div#id-sa').html();
				
				// actualizar la cabecera mediante la vista. Primero obtenemos la key 
				// para la cabecera correspondiente desde la vista 
				var cabecera_vista = jQuery('div#cabecera-vista-formidable').html();
				
				// url base del directorio de medios de wordpress				
				var url_base = 'http://www3.gobiernodecanarias.org/medusa/ecoescuela/plantillasrecursos/files/2019/02/';
				
				// procesar nombre de fichero para eliminar tildes (wordpress las eliminma)
				cabecera_vista = EliminarTildes(cabecera_vista);
				
				// obtener la URL completa de la imagen de cabecera
				var cabeceraURL = url_base + cabecera_vista + '.png';
						
				// comprobar si es un documento vertical o apaisado.			
				// la configuracion de la pagina se obtiene desde el div 
				// con id = 'pagina-apaisada' en la vista formidable. 
				// Si el div existe en la vista, entonces ponemos la vista apaisada,
				// en caso contrario lo cargamos en vertical 
				
				// valores por defecto para la pagina vertical 
				var pagina = 'portrait';
				var alto = '29.699cm';
				var ancho = '20.999cm';
				// valores por defecto de la cabecera vertical
				var anchoCabecera = '20.999cm';
				var altoCabecera = '1.85cm';
				
				if(jQuery('div#pagina-apaisada').length){ // comprobamos si existe con la propiedad length
										
					// la pagina es apaisada, actualizamos las dimensiones
					// del documento en cm 
					pagina = 'landscape';
					alto = '21.001cm';
					ancho = '29.7cm';
					
					// si el documento esta apaisado hay que redimensionar
					// la cabecera para que la imagen ocupe todo el ancho del papel 
					anchoCabecera = '29.7cm';
					altoCabecera = '2.616cm';
					
				} 	
						
					
				// comprobar si debemos omitir la cabecera 
				/*
				if(jQuery('div#omitir-cabecera').length){ 
				} else {
					
				}*/
				
			
				  

				// sustituimos el tag de configuracion de pagina en el styles.xml 
				// definido en el script por el nuevo valor de la pagina recuperdao
				xml_styles_plantilla = xml_styles_plantilla.replace(xml_configuracion_pagina_tag, pagina);
				
				// sustituimos las dimensiones de la pagina 
				xml_styles_plantilla = xml_styles_plantilla.replace(xml_ancho_pagina_tag, ancho);
				xml_styles_plantilla = xml_styles_plantilla.replace(xml_alto_pagina_tag, alto);
				
				// sustituimos las dimensiones de la cabecera
				xml_styles_plantilla = xml_styles_plantilla.replace(xml_ancho_cabecera_tag, anchoCabecera);
				xml_styles_plantilla = xml_styles_plantilla.replace(xml_alto_cabecera_tag, altoCabecera);
				
				 

				// informacion de depuracion 
				console.log('configuracion de la pagina ' + pagina);
				console.log('dimensiones de la pagina ' + alto + ' x ' + ancho);
				console.log('procesando actividad ' + id_actividad + ' con SA ' + id_sa);				
				console.log('cargando cabecera ' + cabeceraURL);
				
				// luego cambiamos el tag de cabecera en el styles.xml definido en este script 
				// por la nueva URL que acabamos de recuperar 
				xml_styles_plantilla = xml_styles_plantilla.replace(xml_cabecera_tag, cabeceraURL);
				
				// ahora cambiamos el pie de pagina definido en el styles.xml de este script
				// para que indique el numero de recurso o actividad 
				xml_styles_plantilla = xml_styles_plantilla.replace(xml_pie_tag, id_actividad);
				xml_styles_plantilla = xml_styles_plantilla.replace(xml_pie_SA_tag, id_sa);
				
								
				// primero obtenemos el contenido de la vista del formidable 
				var xml_content = jQuery('#xml-vista-formidable').val();	

				
				// comprobar si se debe utilizar el contenedor alternativo
				// de xml
				if(jQuery('div#utilizar-contenido-xml-alternativo').length){
					// obtenemos el contenido XML desde el otro contenedor
					// alternativo de la vista, para cargar una plantilla alternativa 
					console.log('utilizando contenedor alternativo de xml');
					xml_content = jQuery('#xml-vista-formidable-alternativa').val();	
					// esto puede ser util para cargar una version, por ejemplo, 
					// con una columna menos
				} else {
					// continuamos normal 
				}

							
					
				// obtener e iterar una lista de todos los div
				// con la class 'activar-campo-opcional' e ir activandolos 
				$('.activar-campo-opcional').each(function(){
					var tag = this.getAttribute('tag');
					console.log('encontrado campo opcional con el tag:' + tag);
					xml_content = ActivarTagOpcional(xml_content, tag);
				});
				
				// limpiar los tags <p></p> de los campos de parrafo
				// de formidable
				xml_content = LimpiarCamposParrafo(xml_content);
				
				// cambia las url de las imagenes para no cargar las imagenes 
				// en miniatura de wordpress y utilizar las completas 
				// xml_content = LimpiarCamposImagen(xml_content);
				
				// volcamos todo el XML de la vista formidable en el content.xml 				
				odtdoc.setXML(xml_content, xml_styles_plantilla);
				
				 
				
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