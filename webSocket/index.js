var express=require('express');
var app=express();
var http=require('http').Server(app);
var io=require('socket.io')(http);
 
app.get('/',function(req,res){
	console.log("123");
    res.sendFile(__dirname+'/index.html');
});
 
var onlineUserCount=0; //�ͻ�����������
var onlineUsers={}; //ͳ�ƿͻ��˵�¼�û�
 
io.on('connection',function(socket){
    socket.emit('open');  //֪ͨ�ͻ���������
     
    //����ͻ��˶���
    var client={
        socket:socket,
        name:false
    }
     
    //�����ͻ��˵�chat message�¼��� ���¼��ɿͻ��˴���
    //��������յ���Ϣ���ٰѸ���Ϣ���ų�ȥ����������chat message�¼��� Ȼ���ڿͻ��˼���chat message�¼���
    socket.on('chat message',function(msg){
        console.log('chat message:'+msg);
        var obj={time:getTime()}; //�����ͻ��˷��صĶ���
         
        //�ж��ǲ��ǵ�һ�����ӣ��Ե�һ����Ϣ��Ϊ�ǳ�
        if(!client.name){
            onlineUserCount++;
             
            client.name=msg;
            obj['text']=client.name;
            obj['author']='Sys';
            obj['type']='welcome';
            obj['onlineUserCount']=onlineUserCount;
            socket.name=client.name; //�û���¼������socket.name�� ���˳�ʱ�øñ�ʶɾ���������û�
            if(!onlineUsers.hasOwnProperty(client.name)){
                onlineUsers[client.name]=client.name;
            }
            obj['onlineUsers']=onlineUsers; //��ǰ�����û�����
            console.log(client.name+' login,��ǰ��������:'+onlineUserCount);
 
            //���ػ�ӭ��
            socket.emit('system',obj);  //���͸��Լ�����Ϣ
            //�㲥���û��ѵ�¼
            socket.broadcast.emit('system',obj); //�������û�������Ϣ
        }else{
            //������ǵ�һ�����죬�򷵻�������������Ϣ
            obj['text']=msg;
            obj['author']=client.name;
            obj['type']='message';
            console.log(client.name+' say:'+msg);
 
            socket.emit('chat message',obj); //���͸��Լ�����Ϣ �� ��������ӡ�Լ����͵���Ϣ����ע�͵��þ䡣
            socket.broadcast.emit('chat message',obj); //�������û�������Ϣ
 
        }
        //io.emit('chat message',msg);
    });
 
    socket.on('disconnect',function(){
        onlineUserCount--;
 
        if(onlineUsers.hasOwnProperty(socket.name)){
            delete onlineUsers[client.name];
        }
 
        var obj={
            time:getTime(),
            author:'Sys',
            text:client.name,
            type:'disconnect',
            onlineUserCount:onlineUserCount,
            onlineUsers:onlineUsers
        };
 
        //�㲥�û��˳�
        socket.broadcast.emit('system',obj); //�û���¼���˳���ʹ��system�¼�����
        console.log(client.name+' disconnect,��ǰ��������:'+onlineUserCount);
    });
 
     
});
 
app.listen(3000,function(){
    console.log('server begin...');
});
 
var getTime=function(){
  var date = new Date();
  return date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
}
 
var getColor=function(){
  var colors = ['aliceblue','antiquewhite','aqua','aquamarine','pink','red','green',
                'orange','blue','blueviolet','brown','burlywood','cadetblue'];
  return colors[Math.round(Math.random() * 10000 % colors.length)];
}