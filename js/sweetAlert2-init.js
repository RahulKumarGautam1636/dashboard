// Sweet  alerts activation.
$('#alert-success').on('click', function () {
    Swal.fire(
        'Good job!',
        'You clicked the button!',
        'success'
    )
});
$('#alert-question').on('click', function () {
    Swal.fire(
        'The Internet?',
        'That thing is still around?',
        'question'
    )
});
$('#alert-warning').on('click', function () {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        confirmButtonColor: '#ffc107',                          // custom button color.
    })
});
$('#alert-info').on('click', function () {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'info',
        confirmButtonColor: '#0dcaf0',                          // custom button color.
    })
});
$('#alert-error').on('click', function () {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: '<a href="">Why do I have this issue?</a>'        // can remove footer.
    })
});
$('#alert-confirm').on('click', function () {
    // const swalWithBootstrapButtons = Swal.mixin({             // this enables to use bootstrap classes to style buttons.
    //     customClass: {                                        // currently disabling due to margin problem on buttons in boostrap 5. 
    //       confirmButton: 'btn btn-success',                   // To use again just uncomment and replace the Swal with swalWithBootstrapButtons object;
    //       cancelButton: 'btn btn-danger'
    //     },
    //     buttonsStyling: false
    //   })
      
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
            Swal.fire(
            'Cancelled',
            'Your imaginary file is safe :)',
            'error'
          )
        }
    })
});
$('#alert-img').on('click', function () {
    Swal.fire({
        title: 'Sweet!',
        text: 'Modal with a custom image.',
        imageUrl: 'https://unsplash.it/400/200',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
    })
});
$('#alert-custom-styles').on('click', function () {
    Swal.fire({
        title: 'Custom width, padding, color, background.',
        width: 600,
        padding: '3em',
        color: '#716add',
        background: '#fff url(/images/trees.png)',
        backdrop: `
          rgba(0,0,123,0.4)
          url("/images/nyan-cat.gif")
          left top
          no-repeat
        `
    })
});    
$('#alert-auto-close').on('click', function () {
    let timerInterval
    Swal.fire({
    title: 'Auto close alert!',
    html: 'I will close in <b></b> milliseconds.',
    timer: 2000,
    timerProgressBar: true,
    didOpen: () => {
        Swal.showLoading()
        const b = Swal.getHtmlContainer().querySelector('b')
        timerInterval = setInterval(() => {
        b.textContent = Swal.getTimerLeft()
        }, 100)
    },
    willClose: () => {
        clearInterval(timerInterval)
    }
    }).then((result) => {
    /* Read more about handling dismissals below */
    if (result.dismiss === Swal.DismissReason.timer) {
        console.log('I was closed by the timer')
    }
    })
});    
$('#alert-input-box').on('click', function () {                      // alert with ajax request handler.
    Swal.fire({
        title: 'Submit your Github username',
        input: 'text',
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Look up',
        showLoaderOnConfirm: true,
        preConfirm: (login) => {
          return fetch(`//api.github.com/users/${login}`)
            .then(response => {
              if (!response.ok) {
                throw new Error(response.statusText)
              }
              return response.json()
            })
            .catch(error => {
              Swal.showValidationMessage(
                `Request failed: ${error}`
              )
            })
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: `${result.value.login}'s avatar`,
            imageUrl: result.value.avatar_url
          })
        }
    })
});