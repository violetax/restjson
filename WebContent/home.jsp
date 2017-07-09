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
  <title>Ejercicio</title>
   
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

	<div class="flex-container">
	
		<div class="flex-item">
		<h4>MIS RESTs</h4>
			<p>Mostrar todos los puntos del Service:</p>
				<button id="boton_cargarTodos" type="button">cargarTodos</button>
			<p>Cargar coordenadas de varios puntos</p>
				<button id=boton_registrarPuntos type="button">registrarPuntos</button>
			<p>PEND Cargar coordenadas de un punto</p>
				<button id="boton_cargarPorPunto" type="button">PEND cargarPorPunto</button>
		</div>
		
		<div class="flex-item">
		<h4>WS RESTs</h4>
			<p>Mostrar todos los puntos de la bdd</p>
				<button id="boton_cargarTodosDesdeBDD" type="button">cargarTodosDesdeBDD</button>
			<p>Crear un punto en la bdd</p>
				<button id="boton_crearPuntoBDD" type="button">crearPuntoBDD</button>
		</div>
		
		<div class="flex-item">
		<h4>NO RESTs</h4>
			<p>Mostrar coordenadas de un punto</p>
				<button id="boton_jcoord" type="button">Ver coord un pto</button>
			<p>Despejar mapa</p>
				<button id="boton_limpiar" type="button"> PEND: limpiar mapa</button>
			<p>IR A PANELES</p>
				<a href="paneles.do">PANELES</a>
			</div>		
	
	</div>
	
<div id="ocultar"></div> 

<div class="center-map">
	<div id="mapid"></div>
</div>


</main>
</body>
</html>