package controller;

import java.io.IOException;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import service.PlacaServiceImpGJ;
import service.interfaces.PlacaServiceGJ;

public class PlacaServlet extends HttpServlet {

	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	PlacaServiceGJ placaServiceGJ = new PlacaServiceImpGJ();
	private RequestDispatcher rd;


	@Override
	public void init() throws ServletException {
		super.init();
	}

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

		try {
			String placasGJ = placaServiceGJ.getAll();
			req.setAttribute("Placas", placasGJ);
			rd = req.getRequestDispatcher("home.jsp");
		} catch (Exception e) {
			System.out.println(e.getMessage());
			resp.sendRedirect("home.jsp");
			return;
		}

		// hace la redireccion
		rd.forward(req, resp);

	}


	/*
	 * (non-Javadoc)
	 * 
	 * @see javax.servlet.http.HttpServlet#doPost(javax.servlet.http.
	 * HttpServletRequest, javax.servlet.http.HttpServletResponse)
	 */
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		
	}

	
	@Override
	public void destroy() {
		placaServiceGJ = null;
		super.destroy();
	}

}