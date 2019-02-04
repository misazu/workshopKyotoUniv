'use strict';

exports.handler = function (event, context, callback) {
    var operationMessage = "あなたの名前、年齢、出身、趣味について紹介できます。";
    operationMessage += "何から紹介しましょうか？";
    const endMessage = 'さようなら。もっと知りたい時は直接たくさんお話しましょう！';
    const notFoundMessage = "私には紹介できません。";
        
    var response = {
        statusCode: 200,
        headers: {},
        body: ""
    };
    
    var speechText = "";
    var requestJson = JSON.parse(event.body).request;
    var sessionJson = JSON.parse(event.body).session;
    var endFlg = false;
    
//=======================================================================
    if (requestJson.type === 'LaunchRequest') {
        // 起動時処理
        speechText = operationMessage;
        // フラグ初期化する
        endFlg = false;
//=======================================================================
    } else if (requestJson.type === 'SessionEndedRequest') {
        // セッション切れ
        speechText = endMessage;
        endFlg = true;
//=======================================================================
    } else if (requestJson.type === 'IntentRequest') {

        if (requestJson.intent.name === 'EndIntent' || 
            requestJson.intent.name === 'Clova.NoIntent' || 
            requestJson.intent.name === 'Clova.CancellIntent') {
            // 終了処理
            speechText = endMessage;
            endFlg = true;
//=======================================================================
        } else if (requestJson.intent.name === 'Clova.YesIntent') {
            // 「はい」と答えた場合
            speechText = operationMessage;
//=======================================================================
        } else if (requestJson.intent.name === 'Clova.GuideIntent') {
            // ヘルプ用
            speechText = operationMessage;
//=======================================================================
        } else if (requestJson.intent.name === 'NameIntent') {
            //名前のインテント
            speechText = "私の名前は「しん　みさき」です。";
            speechText += operationMessage;
//=======================================================================
        } else if (requestJson.intent.name === 'AgeIntent') {
            //年齢のインテント
            speechText = "私の年齢は24歳です。";
            speechText += operationMessage;
//=======================================================================
        } else if (requestJson.intent.name === 'ComeFromIntent') {
            //出身のインテント
            speechText = "私の出身は滋賀県です。";
            speechText += operationMessage;

//=======================================================================
        } else if (requestJson.intent.name === 'HobbyIntent') {
            //趣味のインテント
            speechText = "私の趣味は音楽鑑賞です。";
            speechText += operationMessage;
        }
//=======================================================================
    }

    var responseJson = JSON.stringify({
        "version": "1.0",
        "response": {
            "outputSpeech": {
                "type": "SimpleSpeech",
                "values": {
                    "type":"PlainText",
                    "lang":"ja",
                    "value": speechText
                }
            },
            "card": {},
            "directives": [],
            "shouldEndSession": endFlg
        }
    });
    
    response.body = responseJson;
    
    callback(null, response);

};