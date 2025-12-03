import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./SingleRecipe.css";

function SingleRecipe() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetch(`https://recipebox-og5e.onrender.com/api/recipes/${id}`)
      .then((res) => res.json())
      .then((data) => setRecipe(data))
      .catch((err) => console.error("Error fetching recipe:", err));
  }, [id]);

  const downloadPDF = () => {
    const input = document.getElementById("recipe-pdf");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${recipe.title || "recipe"}.pdf`);
    });
  };

  if (!recipe) return <div>Loading...</div>;

  return (
    <>
      <div className="single-recipe" id="recipe-pdf">
        {recipe.imageUrl ? (
          <img src={recipe.imageUrl} alt={recipe.title} className="recipe-image" />
        ) : (
          <div className="image-placeholder">No Image</div>
        )}
        <div className="recipe-content">
          <h1>{recipe.title}</h1>
          <p><strong>Category:</strong> {recipe.category}</p>

          <p><strong>Time Required:</strong></p>
          <ul>
            {recipe.timeRequired
              .split('\n')
              .filter(time => time.trim() !== "")
              .map((time, index) => (
                <li key={index}>{time.trim()}</li>
              ))}
          </ul>

          <p><strong>Ingredients:</strong></p>
          <ul>
            {recipe.ingredients
              .split('\n')
              .filter(item => item.trim() !== "")
              .map((item, index) => (
                <li key={index}>{item.trim()}</li>
              ))}
          </ul>

          <p><strong>Instructions:</strong></p>
          <ul>
            {recipe.instructions
              .split('\n')
              .filter(line => line.trim() !== "")
              .map((step, index) => (
                <li key={index}>{step.trim()}</li>
              ))}
          </ul>
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button className="download-btn" onClick={downloadPDF}>
          Download Recipe as PDF
        </button>
      </div>
    </>
  );
}

export default SingleRecipe;
