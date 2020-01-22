var datalist1;
var datalist2;
var date_from = date_start.value;
var date_to   = date_end.value;

// ライブラリのロード
// name:visualization(可視化),version:バージョン(1),packages:パッケージ(corechart)
google.load('visualization', '1', {'packages':['corechart']});
// グラフを描画する為のコールバック関数を指定
// google.setOnLoadCallback(chartstart);


// POST通信開始(Function関数へ)
$(function(){
    // Ajax button click
    $('#exec').on('click',function(){
        $.exec({
            url:'./debug.php',		// FunctionURL追加して！！
            type:'POST',
            data:{
                'From':$('#date_start').val(),
                'To':$('#date_end').val()
            }
        })
        // Ajaxリクエストが成功した時発動
        .done( (data) => {
            //$('.result').html(data);		// この辺りを編集(グラフ描画メソッド呼び出し！引数をそのまま渡すのもいいかも？)
            $('.tx-result').val(data);
            datalist1 = data[0];
            datalist2 = data[1];
            console.log(data);
            google.setOnLoadCallback(drawChart);
        })
        // Ajaxリクエストが失敗した時発動
        .fail( (data) => {
            $('.tx-result').val(data);
            console.log(data);
        })
        // Ajaxリクエストが成功・失敗どちらでも発動
        .always( (data) => {

        });
    });
});


// グラフの描画
function drawChart() {

    var Toilet1FData = google.visualization.arrayToDataTable(JSON.parse(datalist1));
    var Toilet2FData = google.visualization.arrayToDataTable(JSON.parse(datalist2));

    // オプションの設定
    var Toilet1FOptions = {
      title : 'YYYY/MM/DD～YYYY/MM/DDの使用回数',
      series: {
        0:{targetAxisIndex:0,
          type: "line"},     // 第1系列は左のY軸を使用
        1:{targetAxisIndex:1},         // 第2系列は右のY時を使用
        },
        hAxis: {title: '時間帯'},
        vAxes: {
          // 0:左のY軸。1:右のY軸
          0: {title: '回数'},
          1: {title: '時間[分]'}
        },
      };

    var Toilet2FOptions = {
      title : 'YYYY/MM/DD～YYYY/MM/DDの使用時間[分]',
      series: {
        0:{targetAxisIndex:0},     // 第1系列は左のY軸を使用
        1:{targetAxisIndex:1,
          type: "line"},         // 第2系列は右のY時を使用
        },
        hAxis: {title: '時間帯'},
        vAxes: {
          // 0:左のY軸。1:右のY軸
          0: {title: '時間[分]'},
          1: {title: '時間[分]'}
        },
      };

  // 指定されたIDの要素に棒グラフを作成
  var chart1 = new google.visualization.LineChart(document.getElementById('chart1_div'));
  var chart2 = new google.visualization.ColumnChart(document.getElementById('chart2_div'));

  //グラフの描画
  chart1.draw(Toilet1FData, Toilet1FOptions);
  chart2.draw(Toilet2FData, Toilet2FOptions);
}
