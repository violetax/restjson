<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@page import="java.util.GregorianCalendar"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="dbms.persistence.Placa"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<!doctype html>

<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Paneles</title>
   
  	<link rel="stylesheet" href="resources/css/styles.css" >
  <!-- load jQuery, JS--> 
 	<script src="resources/js/jquery-3.2.1.min.js"></script>
 	<script type="text/javascript" src="resources/js/codigo.js"></script>
  
  <!--  LEAFLET -->

<link rel="stylesheet" href="https://unpkg.com/leaflet@1.1.0/dist/leaflet.css"
   integrity="sha512-wcw6ts8Anuw10Mzh9Ytw4pylW8+NAD4ch3lqm9lzAsTxg0GFeJgoAtxuCLREZSC5lUXdVyo/7yfsqFjQ4S+aKw=="
   crossorigin=""/>
   
 <script src="https://unpkg.com/leaflet@1.1.0/dist/leaflet.js"
   integrity="sha512-mNqn2Wg7tSToJhvHcqfzLMU6J4mkOImSPTxVZAdo+lcPlk+GhZmYgACEe0x35K7YzW1zJ7XyJV/TT1MrdXvMcA=="
   crossorigin=""></script>

  <!--[if lt IE 9]>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.3/html5shiv.js"></script>
  <![endif]-->
</head>

<body>
<main class="container-fluid">
<div id="ocultar"></div> 

<div class="center-map">
	<div id="mapid"></div>
</div>

	<%
		String paneles =(String) request.getAttribute("Placas"); 	
		
	out.println("<p>"+paneles+"</p>");
		
	
	%>
	
	<div>


</main>
</body>
</html>