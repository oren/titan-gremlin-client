# titan-gremlin-client

## Run Titan

```
git clone https://github.com/oren/titan-gremlin-client.git
cd titan
npm install
vim node_modules/gremlin-client/src/executehandler.js
modify line 4 to: `isArray: require('lodash.isarray')` (lowercase a)
docker-compose up
```

## Test websocket connection

```
bin/test
```

if you see this, everything is good:
```
HTTP/1.1 101 Web Socket Protocol Handshake
Upgrade: WebSocket
Connection: Upgrade
WebSocket-Origin: http://localhost:8182
WebSocket-Location: ws://localhost/gremlin
```

## Run Gremlin client

```
bin/gremlin
:remote connect tinkerpop.server conf/remote.yaml
:> graph.addVertex("name", "stephen")
:> g.V().values('name')
```

if you see this after the last command, everything is good:
```
==>stephen
```

## Try to read data

```
node read.js

events.js:141
      throw er; // Unhandled 'error' event
            ^
Error: Error: Error during serialization: (was java.lang.IllegalStateException) (through reference chain: java.util.ArrayList[0]->com.thinkaurelius.titan.graphdb.relations.RelationIdentifier["inVertexId"]) (Error 599)
    at MessageStream.<anonymous> (/home/oren/projects/titan/titan-gremlin-client/node_modules/gremlin-client/src/gremlinclient.js:264:26)
    at emitOne (events.js:77:13)
    at MessageStream.emit (events.js:169:7)
    at GremlinClient.handleMessage (/home/oren/projects/titan/titan-gremlin-client/node_modules/gremlin-client/src/gremlinclient.js:83:21)
    at WebSocket.onMessage (/home/oren/projects/titan/titan-gremlin-client/node_modules/gremlin-client/node_modules/ws/lib/WebSocket.js:414:14)
    at emitTwo (events.js:87:13)
    at WebSocket.emit (events.js:172:7)
    at Receiver.ontext (/home/oren/projects/titan/titan-gremlin-client/node_modules/gremlin-client/node_modules/ws/lib/WebSocket.js:797:10)
    at /home/oren/projects/titan/titan-gremlin-client/node_modules/gremlin-client/node_modules/ws/lib/Receiver.js:473:18
    at Receiver.applyExtensions (/home/oren/projects/titan/titan-gremlin-client/node_modules/gremlin-client/node_modules/ws/lib/Receiver.js:360:5)
```

and on the server log:
```
titan_1         | 429077 [gremlin-server-exec-4] WARN  com.thinkaurelius.titan.graphdb.transaction.StandardTitanTx  - Query requires iterating over all vertices [()]. For better performance, use indexes
titan_1         | 429134 [gremlin-server-worker-1] WARN  org.apache.tinkerpop.gremlin.driver.ser.GraphSONMessageSerializerV1d0  - Response [ResponseMessage{requestId=78c5ff1d-adaf-c161-cd76-c1e7b3c82548, status=ResponseStatus{code=SUCCESS, message='', attributes={}}, result=ResponseResult{data=[v[4256], v[4264], v[4216], v[4112]], meta={}}}] could not be serialized by org.apache.tinkerpop.gremlin.driver.ser.AbstractGraphSONMessageSerializerV1d0.
titan_1         | 429135 [gremlin-server-worker-1] WARN  org.apache.tinkerpop.gremlin.server.handler.WsGremlinResponseEncoder  - The result [ResponseResult{data=[v[4256], v[4264], v[4216], v[4112]], meta={}}] in the request 78c5ff1d-adaf-c161-cd76-c1e7b3c82548 could not be serialized and returned.
titan_1         | org.apache.tinkerpop.gremlin.driver.ser.SerializationException: com.fasterxml.jackson.databind.JsonMappingException: (was java.lang.IllegalStateException) (through reference chain: java.util.ArrayList[0]->com.thinkaurelius.titan.graphdb.relations.RelationIdentifier["inVertexId"])
titan_1         |       at org.apache.tinkerpop.gremlin.driver.ser.GraphSONMessageSerializerV1d0.serializeResponseAsString(GraphSONMessageSerializerV1d0.java:101)
titan_1         |       at org.apache.tinkerpop.gremlin.server.handler.WsGremlinResponseEncoder.encode(WsGremlinResponseEncoder.java:79)
titan_1         |       at org.apache.tinkerpop.gremlin.server.handler.WsGremlinResponseEncoder.encode(WsGremlinResponseEncoder.java:45)
titan_1         |       at io.netty.handler.codec.MessageToMessageEncoder.write(MessageToMessageEncoder.java:89)
titan_1         |       at io.netty.channel.AbstractChannelHandlerContext.invokeWrite(AbstractChannelHandlerContext.java:633)
titan_1         |       at io.netty.channel.AbstractChannelHandlerContext.write(AbstractChannelHandlerContext.java:691)
titan_1         |       at io.netty.channel.AbstractChannelHandlerContext.write(AbstractChannelHandlerContext.java:626)
titan_1         |       at org.apache.tinkerpop.gremlin.server.handler.IteratorHandler.write(IteratorHandler.java:119)
titan_1         |       at io.netty.channel.AbstractChannelHandlerContext.invokeWrite(AbstractChannelHandlerContext.java:633)
titan_1         |       at io.netty.channel.AbstractChannelHandlerContext.access$1900(AbstractChannelHandlerContext.java:32)
titan_1         |       at io.netty.channel.AbstractChannelHandlerContext$AbstractWriteTask.write(AbstractChannelHandlerContext.java:908)
titan_1         |       at io.netty.channel.AbstractChannelHandlerContext$WriteAndFlushTask.write(AbstractChannelHandlerContext.java:960)
titan_1         |       at io.netty.channel.AbstractChannelHandlerContext$AbstractWriteTask.run(AbstractChannelHandlerContext.java:893)
titan_1         |       at io.netty.util.concurrent.SingleThreadEventExecutor.runAllTasks(SingleThreadEventExecutor.java:380)
titan_1         |       at io.netty.channel.nio.NioEventLoop.run(NioEventLoop.java:357)
titan_1         |       at io.netty.util.concurrent.SingleThreadEventExecutor$2.run(SingleThreadEventExecutor.java:116)
titan_1         |       at java.lang.Thread.run(Thread.java:745)
titan_1         | Caused by: com.fasterxml.jackson.databind.JsonMappingException: (was java.lang.IllegalStateException) (through reference chain: java.util.ArrayList[0]->com.thinkaurelius.titan.graphdb.relations.RelationIdentifier["inVertexId"])
titan_1         |       at com.fasterxml.jackson.databind.JsonMappingException.wrapWithPath(JsonMappingException.java:232)
titan_1         |       at com.fasterxml.jackson.databind.JsonMappingException.wrapWithPath(JsonMappingException.java:197)
titan_1         |       at com.fasterxml.jackson.databind.ser.std.StdSerializer.wrapAndThrow(StdSerializer.java:186)
titan_1         |       at com.fasterxml.jackson.databind.ser.std.BeanSerializerBase.serializeFields(BeanSerializerBase.java:640)
titan_1         |       at com.fasterxml.jackson.databind.ser.BeanSerializer.serialize(BeanSerializer.java:152)
titan_1         |       at org.apache.tinkerpop.gremlin.structure.io.graphson.GraphSONUtil.writeWithType(GraphSONUtil.java:49)
titan_1         |       at org.apache.tinkerpop.gremlin.structure.io.graphson.GraphSONSerializers.serializerVertexProperty(GraphSONSerializers.java:336)
titan_1         |       at org.apache.tinkerpop.gremlin.structure.io.graphson.GraphSONSerializers.access$000(GraphSONSerializers.java:55)
titan_1         |       at org.apache.tinkerpop.gremlin.structure.io.graphson.GraphSONSerializers$VertexJacksonSerializer.writeProperties(GraphSONSerializers.java:216)
titan_1         |       at org.apache.tinkerpop.gremlin.structure.io.graphson.GraphSONSerializers$VertexJacksonSerializer.ser(GraphSONSerializers.java:193)
titan_1         |       at org.apache.tinkerpop.gremlin.structure.io.graphson.GraphSONSerializers$VertexJacksonSerializer.serialize(GraphSONSerializers.java:175)
titan_1         |       at org.apache.tinkerpop.gremlin.structure.io.graphson.GraphSONSerializers$VertexJacksonSerializer.serialize(GraphSONSerializers.java:163)
titan_1         |       at com.fasterxml.jackson.databind.ser.impl.IndexedListSerializer.serializeContents(IndexedListSerializer.java:100)
titan_1         |       at com.fasterxml.jackson.databind.ser.impl.IndexedListSerializer.serializeContents(IndexedListSerializer.java:21)
titan_1         |       at com.fasterxml.jackson.databind.ser.std.AsArraySerializerBase.serialize(AsArraySerializerBase.java:183)
titan_1         |       at org.apache.tinkerpop.gremlin.structure.io.graphson.GraphSONUtil.writeWithType(GraphSONUtil.java:49)
titan_1         |       at org.apache.tinkerpop.gremlin.driver.ser.AbstractGraphSONMessageSerializerV1d0$ResponseMessageSerializer.ser(AbstractGraphSONMessageSerializerV1d0.java:235)
titan_1         |       at org.apache.tinkerpop.gremlin.driver.ser.AbstractGraphSONMessageSerializerV1d0$ResponseMessageSerializer.serialize(AbstractGraphSONMessageSerializerV1d0.java:205)
titan_1         |       at org.apache.tinkerpop.gremlin.driver.ser.AbstractGraphSONMessageSerializerV1d0$ResponseMessageSerializer.serialize(AbstractGraphSONMessageSerializerV1d0.java:197)
titan_1         |       at com.fasterxml.jackson.databind.ser.DefaultSerializerProvider.serializeValue(DefaultSerializerProvider.java:114)
titan_1         |       at com.fasterxml.jackson.databind.ObjectMapper._configAndWriteValue(ObjectMapper.java:2811)
titan_1         |       at com.fasterxml.jackson.databind.ObjectMapper.writeValueAsString(ObjectMapper.java:2268)
titan_1         |       at org.apache.tinkerpop.gremlin.driver.ser.GraphSONMessageSerializerV1d0.serializeResponseAsString(GraphSONMessageSerializerV1d0.java:98)
titan_1         |       ... 16 more
titan_1         | Caused by: java.lang.IllegalStateException
titan_1         |       at com.google.common.base.Preconditions.checkState(Preconditions.java:158)
titan_1         |       at com.thinkaurelius.titan.graphdb.relations.RelationIdentifier.getInVertexId(RelationIdentifier.java:69)
titan_1         |       at sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method)
titan_1         |       at sun.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:62)
titan_1         |       at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
titan_1         |       at java.lang.reflect.Method.invoke(Method.java:497)
titan_1         |       at com.fasterxml.jackson.databind.ser.BeanPropertyWriter.get(BeanPropertyWriter.java:726)
titan_1         |       at com.fasterxml.jackson.databind.ser.BeanPropertyWriter.serializeAsField(BeanPropertyWriter.java:506)
titan_1         |       at com.fasterxml.jackson.databind.ser.std.BeanSerializerBase.serializeFields(BeanSerializerBase.java:632)
titan_1         |       ... 35 more
```

## Try to inseart data

```
node insert.js
```

(similar error to the above)

