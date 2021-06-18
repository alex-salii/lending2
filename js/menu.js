"use strict"


// menu burger 

const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');
if (iconMenu) {
  iconMenu.addEventListener("click", function (e) {
    document.body.classList.toggle('_lock');
    iconMenu.classList.toggle('_active');
    menuBody.classList.toggle('_active');
  });
}


///////////////////отправка на почту/////////////////////

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('form');
  form.addEventListener('submit', formSend);

  async function formSend(e) {
    e.preventDefault();

    let error = formValidate(form);

    if(error ===0){
      let response = await fetch('sendmail.php', {
        method: 'POST',
        body: FormData
      });
      if(response.ok) {
        let result = await response.json();
        alert(result.message);
        formPreview.innerHTML = '';
        form.reset();
      }else {
        alert("Ошибка отправки")
      }
    }else {
      alert('Заполните обязательные поля')
    }
  }


  function formValidate(form) {
    let error = 0;
    let formReg = document.querySelectorAll('._reg')

    for (let index = 0; index < formReg.length; index++) {
      const input = formReg[index];
      formRemoveError(input);

      if(input.classList.contains('_email')){
        if (emailTest(input)) {
          formAddError(input);
          error++;
        }
      }else if(input.getAttribute("type") === "checkbox" && input.checkbox === false){
        formAddError(input);
        error++;
      }else {
        if(input.value === '') {
          formAddError(input);
          error++;
        }
      }

    }
    return error;
  }

  function formAddError(input) {
    input.parentElement.classList.add('_error');
    input.classList.add('_error');
  }

  function formRemoveError(input) {
    input.parentElement.classList.remove('_error');
    input.classList.remove('_error');
  }

  //функция теста email

  function emailTest(input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input.value);
  }
});