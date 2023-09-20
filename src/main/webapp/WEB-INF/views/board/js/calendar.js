$(document).ready(function() {
    calendarInit();
});
/*
    달력 렌더링 할 때 필요한 정보 목록 

    현재 월(초기값 : 현재 시간)
    금월 마지막일 날짜와 요일
    전월 마지막일 날짜와 요일
*/

function calendarInit() {

    // 날짜 정보 가져오기
    var date = new Date(); // 현재 날짜(로컬 기준) 가져오기
    var utc = date.getTime() + (date.getTimezoneOffset() * 60 * 1000); // uct 표준시 도출
    var kstGap = 9 * 60 * 60 * 1000; // 한국 kst 기준시간 더하기
    var today = new Date(utc + kstGap); // 한국 시간으로 date 객체 만들기(오늘)
  
    var thisMonth = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    // 달력에서 표기하는 날짜 객체
  
    
    var currentYear = thisMonth.getFullYear(); // 달력에서 표기하는 연
    var currentMonth = thisMonth.getMonth(); // 달력에서 표기하는 월
    var currentDate = thisMonth.getDate(); // 달력에서 표기하는 일

    // kst 기준 현재시간
    // console.log(thisMonth);

    // 캘린더 렌더링
    renderCalender(thisMonth);

    function renderCalender(thisMonth) {

        // 렌더링을 위한 데이터 정리
        currentYear = thisMonth.getFullYear();
        currentMonth = thisMonth.getMonth();
        currentDate = thisMonth.getDate();

        // 이전 달의 마지막 날 날짜와 요일 구하기
        var startDay = new Date(currentYear, currentMonth, 0);
        var prevDate = startDay.getDate();
        var prevDay = startDay.getDay();

        // 이번 달의 마지막날 날짜와 요일 구하기
        var endDay = new Date(currentYear, currentMonth + 1, 0);
        var nextDate = endDay.getDate();
        var nextDay = endDay.getDay();

        
        //input 값 설정
         
        
        // console.log(prevDate, prevDay, nextDate, nextDay);

        // 현재 월 표기
        $('.month').text(currentMonth + 1);
        $('.inputMonth').val(currentMonth + 1);
        
        // 햔제 년 표기
        $('.year').text(currentYear);
        $('.inputYear').val(currentYear);
       
        // 년,월,날짜 표기
        $('.fullDate').text(currentYear + "년 " + (currentMonth + 1) + "월 " + currentDate + "일"  );
        $('.inputDate').val(currentYear + "년 " + (currentMonth + 1) + "월 " + currentDate + "일"  );
        
        
        document.querySelector('form').addEventListener('submit', function(event) { 
            // 체크박스가 체크되었는지 확인
            if (document.getElementById("flexCheckDefault").checked) {
            	document.getElementById("flexCheckDefault_hidden").disabled = true;
            }
        });
        
//        //체크박스 값 
//        let checkbox = document.querySelector('input[name="calReq"]');
//        checkbox.addEventListener('change', function() {
//            // 체크박스가 체크되었는지 확인
//            if (checkbox.checked) {
//                // 체크되었을 때 calReq 변수에 원하는 값을 설정
//            	checkbox.value = "중요";
//            } else {
//                // 체크가 해제되었을 때 calReq 변수를 초기화
//            	checkbox.value = "중요x";
//            }
//        });
        
        
        // 렌더링 html 요소 생성
        calendar = document.querySelector('.dates')
        calendar.innerHTML = '';
        
        // 지난달
        for (var i = prevDate - prevDay ; i <= prevDate; i++) {
            calendar.innerHTML = calendar.innerHTML + '<div class="day prev disable">' + i + '</div>'
        }
        // 이번달
        for (var i = 1; i <= nextDate; i++) {
        	calendar.innerHTML = calendar.innerHTML + "<a  class='day current' data-toggle='modal' data-target='#exampleModal'  value='" + i + "'>" + i + '</a>'
        }
        // 다음달
        for (var i = 1; i <= (7 - nextDay == 7 ? 0 : 7 - nextDay); i++) {
            calendar.innerHTML = calendar.innerHTML + '<div class="day next disable">' + i + '</div>'
        }

        // 오늘 날짜 표기
        if (today.getMonth() == currentMonth) {
            todayDate = today.getDate();
            var currentMonthDate = document.querySelectorAll('.dates .current');
            currentMonthDate[todayDate -1].classList.add('today');
        }
    }
    
    //클릭한  일 값 가져오기
    $(document).on('click', '.day', function() {
        // 클릭한 일자의 값을 가져옵니다.
        let dayValue = $(this).attr('value');

        // 모달 엘리먼트를 찾기.
        let modal = $('#exampleModal');

        // 모달 내부의 inputDay 엘리먼트를 찾아서 해당 엘리먼트의 value 값을 설정
        modal.find('.inputDay').val(dayValue);

        // 모달을 엽니다.
        modal.modal('show');
    });

    // 이전달로 이동
    $('.go-prev').on('click', function() {
        thisMonth = new Date(currentYear, currentMonth - 1, 1);
        renderCalender(thisMonth);
    });

    // 다음달로 이동
    $('.go-next').on('click', function() {
        thisMonth = new Date(currentYear, currentMonth + 1, 1);
        renderCalender(thisMonth); 
    });
}