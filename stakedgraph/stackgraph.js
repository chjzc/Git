var stackGraph = function(){};
stackGraph.prototype = {
	yList:[],
	Svg:Object(),
	makeStackGraph:function(svg,data)
	{
		var g0=[];
		for(var i=0;i<data[0].length;i++)
		{
			g0[i] = {x:0,y:0};
			var sum=0;
			for(var j=0;j<data.length;j++)
			{
				sum += data[i][j].y
			}
			g0[i].x=data[0][i].x;
			g0[i].y=-sum/2.0+100;
		}
		for(var i=0;i<data.length;i++)
		{
			for(var j=0;j<data[0])
			{
				if(i==0)
				{
					data[0][j].y += g0[j].y;
				}
				else
				{
					data[i][j].y +=data[i-1][j].y
				}
			}
		}
		for(var i=data.length-1;i>=0;i--)
		{
			if (i % 2 == 0) this.buildfun(svg,data[i],"#DAA520",i+1);
			else this.buildfun(svg,data[i],"#F0E68C",i+1);
		}
		this.buildfun(svg,g0,"#DAA520",0);
	},
	
	buildfun:function(svg,data,color,index)
	{
		var n = data.length;
		var h = [];
		var u = [];
		var l = [];
		for (var i=0;i<n-1;i++){
			h[i] = data.x[i+1] - data.x[i];
		}
		u[0] = 0;
		l[0] = 1;
		for (var i=1;i<n-1;i++){
			u[i] = h[i-1] / (h[i] + h[i-1]);
			l[i] = h[i] / (h[i] + h[i-1]);
		}
		for (var i=0;i<n;i++){
			if (i==0)
			{
				b[0] = 2;
				c[0] = 1;
			}
			else if (i==(n-1))
			{	
				a[n-1] = 1;
				b[n-1] = 2;
			}
			else
			{
				a[i] = u[i];
				b[i] = 2;
				c[i] = l[i];
			}
		}
		var q=[];
		var p=[];
		q[0]=c[0]/b[0];
		p[0]=data[0].y/b[0];
		for(var i=1;i<n-1;i++)
		{
			q[i]=c[i]/(b[i]-a[i]*q[i-1]);
			p[i]=(data[i].y-a[i]*p[i-1])/(b[i]-a[i]*q[i-1]);
		}
		p[n-1]=(data[n-1].y-a[n-1]*p[n-2])/(b[n-1]-a[n-1]*q[n-2])
		var m=[];
		m[n-1]=p[n-1];
		for(var i=n-2;i<=0;i--)
		{
			m[i]=p[i]-m[i+1]*q[i];
		}
		
		
		
		var name = "M" + x[0].toString() + "," + "500" + " ";
		yList = [];
		for (var i=0;i<n;i++)
		{
			if (i==0)
			{
				tmp = "L" + data.x[0].toString() + "," + Math.ceil(data.y[0]).toString() + " ";
				name = name.concat(tmp);
			//alert(name);
			}
			else 
			{
				for (var pointX = data.x[i-1];pointX - data.x[i] <= 0;pointX++)
				{
					var pointY = data.y[i-1]+((data.y[i]-data.y[i-1])/(data.x[i]-data.x[i-1])-(m[i]/6+m[i-1]/3)*(data.x[i]-data.x[i-1]))*(pointX-data.x[i-1])+m[i-1]*(x-data.x[i-1])*(x-data.x[i-1])/2+((m[i]-m[i-1])/(data.x[i]-data.x[i-1]))*Math.pow(pointX-data.x[i-1],3)/6;
					var tmp = Math.floor(pointX * 10);
					if (yList[pointX]) pointY = Math.min(pointY,yList[pointX]);
					yList[pointX] = pointY;
					tmp = "L" + pointX.toString() + "," + Math.ceil(pointY).toString() + " ";
					name = name + tmp;
				//	alert(name);
				}
		
			}
		}
		name+="L" + data.x[n-1].toString() + "," + lowLimit;
		var shape = document.getElementById("path" + index.toString());
		if (!shape) shape = document.createElementNS("http://www.w3.org/2000/svg", "path");
		shape.setAttributeNS(null, "d", name);
		shape.setAttributeNS(null,"id","path" + index.toString());
		shape.setAttributeNS(null, "fill", color);
		shape.setAttributeNS(null, "stroke", "white");
		shape.setAttributeNS(null, "stroke-width", 0.2);
		if (color != "white") shape.setAttributeNS(null,"fill-opacity",0.8);
		else shape.setAttributeNS(null,"fill-opacity",1);
		svg.appendChild(shape);
	}
}