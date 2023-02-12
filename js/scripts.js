//Código javascript para nuestro proyecto


(function($) {"use strict"; //Modo estricto para ver errores
    
//Código de la animación de cargado, se hace el display en el HTML y se desaparece tras un tiempo.    
	$(window).on('load', function() {
		var preloaderFadeOutTime = 500;
		function hidePreloader() {
			var preloader = $('.spinner-wrapper');
			setTimeout(function() {
				preloader.fadeOut(preloaderFadeOutTime);
			}, 500);
		}
		hidePreloader();
	});

//Mostrar la navbar solida o transparente según el offset, simplemente cambiamos la clase.
    $(window).on('scroll load', function() {
		if ($(".navbar").offset().top > 60) {
			$(".fixed-top").addClass("top-nav-collapse");
		} else {
			$(".fixed-top").removeClass("top-nav-collapse");
		}
    });
//necesitamos descargar Jquery para que funcionara.
	$(function() {
		$(document).on('click', 'a.page-scroll', function(event) {
			var $anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: $($anchor.attr('href')).offset().top
			}, 600, 'easeInOutExpo');
			event.preventDefault();
		});
	});

    //Cerramos el menu desplegable cuando se le hace click
    $(".navbar-nav li a").on("click", function(event) {
    if (!$(this).parent().hasClass('dropdown'))
        $(".navbar-collapse").collapse('hide');
    });


//Slider de imagenes de las compañias que trabajan con ABCloud
    var imageSlider = new Swiper('.image-slider', {
        autoplay: {
            delay: 2000, //Delay
            disableOnInteraction: false //Seguir funcionando incluso si se arrastra el slider
		},
        loop: true,
        spaceBetween: 30,
        slidesPerView: 5,
		breakpoints: {
            // Display según la resolución
            580: {
                slidesPerView: 1,
                spaceBetween: 10
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            992: {
                slidesPerView: 3,
                spaceBetween: 20
            },
            1200: {
                slidesPerView: 4,
                spaceBetween: 20
            },

        }
    });

//El otro slider que usamos, el de los clientes, es configuración más que nada
	var cardSlider = new Swiper('.card-slider', {
		autoplay: {
            delay: 4000,
            disableOnInteraction: false
		},
        loop: true,
        navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev'
		}
    });
    

    /* Lightbox de Magnific Popup para videos */
    $('.popup-youtube, .popup-vimeo').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false,
        iframe: {
            patterns: {
                youtube: {
                    index: 'youtube.com/', 
                    id: function(url) {        
                        var m = url.match(/[\\?\\&]v=([^\\?\\&]+)/);
                        if ( !m || !m[1] ) return null;
                        return m[1];
                    },
                    src: 'https://www.youtube.com/embed/%id%?autoplay=1'
                },
                vimeo: {
                    index: 'vimeo.com/', 
                    id: function(url) {        
                        var m = url.match(/(https?:\/\/)?(www.)?(player.)?vimeo.com\/([a-z]*\/)*([0-9]{6,11})[?]?.*/);
                        if ( !m || !m[5] ) return null;
                        return m[5];
                    },
                    src: 'https://player.vimeo.com/video/%id%?autoplay=1'
                }
            }
        }
    });


    /* Lightbox de Magnific Popup, la usamos en los detalles de los servicios*/
	$('.popup-with-move-anim').magnificPopup({
		type: 'inline',
		fixedContentPos: false,
		fixedBgPos: true,
		overflowY: 'auto',
		closeBtnInside: true,
		preloader: false,
		midClick: true,
		removalDelay: 300,
		mainClass: 'my-mfp-slide-bottom'
	});
    
    
    /* Manejo de los "placeholder" cuando se escribe en los forms*/

    // inputs
    $("input, textarea").keyup(function(){
		if ($(this).val() != '') {
			$(this).addClass('notEmpty');
		} else {
			$(this).removeClass('notEmpty');
		}
    });
    /*Formulario */
    $("#requestForm").validator().on("submit", function(event) {
    	if (event.isDefaultPrevented()) {
            // handeler...
            rformError();
            rsubmitMSG(false, "Debes llenar todos los campos");
        } else {
            // OK!! 8)
            rformSuccess();
        }
    });


    function rformSuccess() {
        
        rsubmitMSG(true, "Solicitud enviada");
        $("input").removeClass('notEmpty'); // reinicia el form
    }

    function rformError() {
        $("#requestForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
            $(this).removeClass();
        });
	}

    function rsubmitMSG(valid, msg) {
        if (valid) {
            var msgClasses = "h3 text-center tada animated";
        } else {
            var msgClasses = "h3 text-center";
        }
        $("#rmsgSubmit").removeClass().addClass(msgClasses).text(msg);
    }
    
    // Botón para regresar al inicio, aparece despues de hacer scroll
    $('body').prepend('<a href="body" class="back-to-top page-scroll">Botón azul bien perrón de Aarón 8)</a>');
    var amountScrolled = 700;
    $(window).scroll(function() {
        if ($(window).scrollTop() > amountScrolled) {
            $('a.back-to-top').fadeIn('500');
        } else {
            $('a.back-to-top').fadeOut('500');
        }
    });


	//Hace que los botónes no tengan focus y se activen más rapido
	$(".button, a, button").mouseup(function() {
		$(this).blur();
	});

    function resizeIframe(obj) {
        obj.style.height = obj.contentWindow.document.documentElement.scrollHeight + 'px';
      }

})(jQuery);