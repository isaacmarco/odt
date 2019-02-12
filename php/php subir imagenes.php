add_filter( 'frm_new_post', 'create_a_custom_field', 10, 2 );
function create_a_custom_field( $post, $args ) {
  $field_id = 203; // id del campo de subida 
  if ( isset( $_POST['item_meta'][ $field_id ] ) ) {
    $field_value = sanitize_text_field( $_POST['item_meta'][ $field_id ] );
    $post['post_custom']['imagen_url'] = wp_get_attachment_url( $field_value ); // 'imagen_url' es el nombre del campo custom 
  }
  return $post;
}