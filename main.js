let target_id = 0;
    $(document).ready(function(){
        console.log("시작!")

        $.ajax({
            url:"https://api.themoviedb.org/3/movie/popular?api_key=10923b261ba94d897ac6b81148314a3f&page=1",
            data:{"key":"vlaue"},
            type:"post",
            success:function(json){
                console.log(json)
                $(".row").html('')
                let movie_list = json.results;
                for(let i=0; i<movie_list.length; i++){
                  let card = `<div class="col mb-4">
                                <div class="card h-100">
                                  <img src="${'https://image.tmdb.org/t/p/w500/'+movie_list[i].poster_path}" class="card-img-top" alt="...">
                                  <div class="card-body">
                                    <div class="card-header">
                                      <h5 class="card-title">${movie_list[i].original_title}</h5>
                                      <h6 class="card-date">Release Date : ${movie_list[i].release_date}</h6>
                                    </div>
                                    <p class="card-text">${movie_list[i].overview}</p>
                                    <a class="btn btn-primary btn-success" href="#" role="button" onclick="review(${movie_list[i].id})">리뷰보기</a>
                                  </div>
                                </div>
                              </div>
                            </div>`
                  $(".row").append(card)
                }
            },
            error:function(err){

            }
        })
    })

    function review(id){
      target_id = id
      $.ajax({
        url:`http://universeapi.net/review/list?movie_id=${id}`,
        data:{},
        type:"GET",
        success:function(json){
          console.log(json.data)
          let reviews = json.data;
          for(let i=0; i<reviews.length; i++){
            $(".modal-body").append(`<p>${reviews[i].review}</p>`)
          }
        }
      })

      $('#myModal').modal('show')
    }

    function addReview(){
      let review = $(".form-control").val();
      let review_html = `<p>${review}</p>`
      $.ajax({
        url:`http://universeapi.net/review/add`,
        data:{
          movie_id:target_id,
          review:review
        },
        type:"POST",
        success:function(json){
          console.log(json)
        }
      })
      $(".modal-body").append(review_html);
      $(".form-control").val('');
    }

    $(window).scroll(function(){
      if($(this).scrollTop() > 300){
        $('.tothetop').fadeIn();
      } else{
        $('.tothetop').fadeOut();
      }
    })

    $('#tothetop').click(function(){
      var htmloffset = $('html').offset();
      $('html,body').animate({
        scrollTop:htmloffset.top
      }, 400);
      return false;
    })