$(document).ready(function () {

  $(".hamburger").click(function () {
    $(this).toggleClass("is-active");
  });

  $('.three').click(function () {
    if ($('.three').hasClass("active")) {
      closeMenu()
    } else {
      openMenu()
    }

    function openMenu() {
      $('.three').addClass("active");
      $('.drawer-menu').animate(
        {
          width: "20vw",
          height: "100vh",
        }, 'slow')

      $(".three").animate(
        {
          marginRight: "10vw",

        }, 'slow')
      $(".shift").animate(
        {
          marginRight: "21vw",

        }, 'slow')

      $(".first-logo").css({
        display: "none"

      })
      $(".extra").text('menu');

    }

    function closeMenu() {
      $('.three').removeClass("active")
      $('.drawer-menu').animate(
        {
          width: "0",
          height: "100vh"
        }, 100)
      $(".first-logo").css({
        display: "flex"

      })
      $(".three").animate(
        {
          marginRight: '0vw'
        }, 'slow')
      $(".shift").animate(
        {
          marginRight: "0vw",

        }, 'slow')
      $(".extra").text('Extra');
    }
  })

  // $(window).triggre("resize",function(){
  //   if($(window).width()<=766){
  //     //console.log($(window).width())
  //     $('.just-padding').before(`
  //     <a class="linkTransition">Home</a>
  //     <a class="linkTransition"> rooms</a>
  //     <a class="linkTransition">location</a>
  //     <a class="linkTransition">activities</a>
  //     <a class="linkTransition" >restaurant</a>
  //     <a class="linkTransition">spa</a>
  //     <a class="linkTransition" >contact</a>
  //     <a class="linkTransition">more 
  //     </a>
  //   `);
  //   $('.navbar-ul').css({display:'none'})

  // }else{
  //   $('.navbar-ul').css({display:'flex'})
  // }
  // })


  // submenu
  $(function () {
    $(".main li").hover(
      function () {
        $('>ul.subMenu', this).slideDown(500);
      },
      function () {
        $('>ul.subMenu', this).slideUp(300)

      })

  })

  //make carousel
  $(".owl-carousel").owlCarousel({
    items: 1,
    loop: true,
    nav: true,
    autoWidth: true,
    autoplay: true,
    autoPlaySpeed: 500,
    autoplayTimeOut: 500,
    dots: true,
    navText: [
      "<div class='nav-btn prev-slide'><</div>",
      "<div class='nav-btn next-slide'><</div>",
    ],
  });

  $(".owl-carousel").on("changed.owl.carousel", function (e) {
    let item = e.item.index - 2;
    $("h3 , button").removeClass("animated fadeInUp");
    $(".owl-item")
      .not(".cloned")
      .eq(item)
      .find("h3 , button")
      .addClass("animated fadeInUp");
  });

  // make for request button
  $(".request").click(function () {

    let checkInDate = new Date($("#checkInDate").val()).getTime();
    let checkOutDate = new Date($("#checkOutDate").val()).    getTime();
    let numberOfBed=$("#NumberOfBed").val()
    if (checkInDate && checkOutDate) {
      $.ajax({
        url: "./assets/json/date.json",
        type: "GET",
        success: (result) => {
          result.map((date) => {
            let fromTimeStam = new Date(date.from).getTime();
            let toTimeStam = new Date(date.to).getTime();
            
            if (checkInDate >= fromTimeStam && checkOutDate <= toTimeStam && numberOfBed == date.bed) {
              //console.log(date.room);
              add()
              $("#tbody tr:last").css({ backgroundColor: "green" });
            } else {
              add()
            }
            function add() {
              $("#b").css("display", "block");
              $("#tbody").append(`<tr>
            <td>${date.from}</td>
            <td>${date.to}</td>
            <td>${date.room}</td>
            <td>${date.bed}</td>
          </tr>`);
            }
          });
        },
      });
    }
    
  });

  $(".cancel").click(function () {
    $("#b").fadeOut();
    $("#tbody").empty();
  });
  


  let currentSlide = 0,
    nav = $(".CarouselNav li");

  function setSlide(index) {
    nav.removeClass("selectedCarouselNav");
    nav.eq(index).addClass("selectedCarouselNav");
    $(".threeSlides").css("display", "none");
    $(".threeSlides").eq(index).css("display", "flex");
  }

  $(".CarouselNav li").click(function () {
    let index = $(".CarouselNav li").index($(this));
    currentSlide = index;
    setSlide(currentSlide);
  });
  function slide() {
    if (currentSlide < nav.length - 1) {
      currentSlide++;
      setSlide(currentSlide);
    } else {
      currentSlide = 0;
      setSlide(currentSlide);
    }
  }

  let interval = setInterval(slide, 3000);

});








