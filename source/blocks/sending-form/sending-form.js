$(document).ready(function(){
  $("input.sending-form__input-field_date").on("keyup", function(){
    let newMask = destroyMask(this.value);
    this.value = createMask(newMask);
  })

  function createMask(string){
    if ((string.length > 2) && (string.length <= 4)){
      return string.replace(/(\d{2})/,"$1/");
    }
    return string.replace(/(\d{2})(\d{3})(\d{2})/,"$1-$2-$3");
  }

  function destroyMask(string){
    return string.replace(/\D/g,'').substring(0, 4);
  }
})
