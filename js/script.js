$(document).ready(function(){
    var cityName = []; //버튼 클릭시 또는 검색바에서 입력 후 엔터를 누를 시, 도시명 데이터를 수집한다.
    console.log(cityName); //[]

    var myAPI = `6419cec605a71b6105ac4f7778466482`;

    var state_icon = ""; //텍스트 아이콘을 이미지 아이콘으로 변경할 수 있는 데이터

    var w_box = `
    <li>
        <div class="top">
            <div class="cur_icon">
                <i class="wi"></i>
            </div>
            <div class="info">
                <p class="temp"><span class="degree">22</span>&nbsp;℃</p>
                <p class="interTemp">
                    최저 <span class="temp_min">9</span>℃ / 
                    최고 <span class="temp_max">25</span>℃
                </p>
                <h4>Clear</h4>
                <p class="location">
                    <span class="city">Busan</span>,
                    <span class="nation">KR</span>
                </p>
            </div>
        </div>

        <div class="bottom">
            <div class="wind">
                <i class="wi wi-strong-wind"></i>
                <p><span>0.00</span>m/s</p>
            </div>
            <div class="humidity">
                <i class="wi wi-humidity"></i>
                <p><span>00</span>%</p>
            </div>
            <div class="cloud">
                <i class="wi wi-cloudy"></i>
                <p><span>00</span>%</p>
                </div>
                </div>
                </li>
                `;
                
                              
    function w_info(){

        $("#weather ul").empty();

        for(v of cityName){
            $("#weather ul").append(w_box);
        }

        //append(), prepend() 자식을 추가하는 메서드는 기존 자식을 남기는 상태에서 
        //새로운 자식들을 추가 ==> 기존 데이터를 새롭게 반복하여 조정하고자 할 때는 
        //반복문 이전에 초기화가 필요

        $("#weather ul li").each(function(index){



            /// ajax 구문의 시작 ///
            $.ajax({
                url : `https://api.openweathermap.org/data/2.5/weather?q=${cityName[index]}&appid=${myAPI}`,
                dataType : "json",
                success : function(data){
                    console.log(data); //object
                    var weather = data.weather[0].main;
                    console.log("현재 날씨 : " + weather);
                    
                    var f_temp = data.main.temp;
                    var temp = Math.round(f_temp - 273.15);
                    console.log("현재 온도 (화씨) : " + f_temp + "Ｆ");
                    console.log("현재 온도 (섭씨) : " + temp + "℃");
                    
                    var min_temp = Math.round(data.main.temp_min - 273.15);
                    console.log("최저 온도 : " + min_temp + "℃");
                    
                    var max_temp = Math.round(data.main.temp_max - 273.15);
                    console.log("최고 온도 : " + max_temp + "℃");
                    
                    var city = data.name;
                    console.log("도시명 : " + city);
                    
                    var nation = data.sys.country;
                    console.log("국가명 : " + nation);
                    
                    var wind = data.wind.speed;
                    console.log("현재 풍속 : " + wind);
                    
                    var humidity = data.main.humidity;
                    console.log("현재 습도 : " + humidity);
                    
                    var cloud = data.clouds.all;
                    console.log("구름 양 : " + cloud);
                    
                    // 텍스트화 된 날씨(변수명 weather) 데이터 이미지를 아이콘으로 변경
                    if(weather == "Clear") state_icon = "wi-day-sunny";
                    else if(weather == "Cloud") state_icon = "wi-cloud";
                    else if(weather == "Rain") state_icon = "wi-rain";
                    else if(weather == "Snow") state_icon = "wi-snow";
                    else if(weather == "Mist") state_icon = "wi-fog";
                    else if(weather == "Haze") state_icon = "wi-day-haze";
                    else if(weather == "Clouds") state_icon = "wi-day-cloudy";
                    
                    $("#weather li").eq(index).find(".cur_icon i").addClass(state_icon);
                    $("#weather li").eq(index).find(".temp .degree").text(temp);
                    $("#weather li").eq(index).find(".interTemp .temp_min").text(min_temp);
                    $("#weather li").eq(index).find(".interTemp .temp_max").text(max_temp);
                    $("#weather li").eq(index).find(".info h4").text(weather);
                    $("#weather li").eq(index).find(".location .city").text(city);
                    $("#weather li").eq(index).find(".location .nation").text(nation);
                    $("#weather li").eq(index).find(".wind span").text(wind);
                    $("#weather li").eq(index).find(".humidity span").text(humidity);
                    $("#weather li").eq(index).find(".cloud span").text(cloud);
                    
                    if(temp >= 25){ 
                        $("#weather ul li").eq(index).find(".top").css("background-color", "#ff2a2a");
                        $("#weather ul li").eq(index).find(".bottom > div i").css("color", "#ff2a2a");
                    }
                    else if(temp >= 20){ 
                        $("#weather ul li").eq(index).find(".top").css("background-color", "tomato");
                        $("#weather ul li").eq(index).find(".bottom > div i").css("color", "tomato");
                    }
                    else if(temp >= 15){ 
                        $("#weather ul li").eq(index).find(".top").css("background-color", "#ffa090");
                        $("#weather ul li").eq(index).find(".bottom > div i").css("color", "#ffa090");
                    }
                    else if(temp >= 10){ 
                        $("#weather ul li").eq(index).find(".top").css("background-color", "#7e9bec");
                        $("#weather ul li").eq(index).find(".bottom > div i").css("color", "#7e9bec");
                    }
                    else if(temp >= 5){ 
                        $("#weather ul li").eq(index).find(".top").css("background-color", "#4271f1");
                        $("#weather ul li").eq(index).find(".bottom > div i").css("color", "#4271f1");
                    }
                } /// sucess 구문의 종료 ///
            }); /// ajax 구문의 종료 ///
        }); /// each문의 종료 ///
    } /// w_info함수 종료 ///
    
            
    $(document).on("click", ".cities button", function(){
        console.log(this);
        var city_txt = $(this).text(); //클릭한 곳의 텍스트를 추출
        console.log(city_txt);

        cityName.unshift(city_txt); 
        //cityName이라는 전역 변수에 배열 데이터의 첫 번째 인덱스에 추출한 텍스트(도시명)를 넣어준다.
        console.log(cityName);

        $(this).remove();  //클릭한 곳의 버튼을 제거한다.

        w_info();
    });
    
    function searching(){
        var search_val = $("#search_box").val();
        if(search_val.trim() == ""){
            alert("검색어를 입력 바랍니다.");
            $("#search_box").focus();
        }else{
            cityName.unshift(search_val);
            w_info();
        }
    }
    
    $(".search button").click(function(){
        searching();
    });
    
    $("#search_box").keydown(function(e){
        if(e.keyCode == "13"){
            searching();
        }
    });
    

    //현재 나의 위치 정보를 가져와서 해당하는 날씨를 보여준다.
    //https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid={API key}
    navigator.geolocation.getCurrentPosition(function(position){
        console.log(position);
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        console.log(latitude);
        console.log(longitude);

        $.ajax({
            url : `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${myAPI}`,
            dataType : "json",
            success : function(data){
                console.log(data);
                var city = data.name;
                console.log("도시명 : " + city);
                
                cityName.unshift(city); //브라우저가 로딩하자마자 현재 나의 위피를 배열 데이터에 넣는다.
                w_info();//함수문을 호출한다 => 배열 데이터의 개수에 따라 구조를 구성하고 그 데이터 내용을 넣겠다는 의미
            }
        });






    });
    
    
    
    
    
    
    













});