// // src/pages/ResultPage.jsx

// const ResultPage = ({ score, onRestart }) => (
//     <div style={{ textAlign: 'center' }}>
//       <h2>🎮 Game Over!</h2>
//       <p>Your Final Score: <strong>{score}</strong></p>
//       <button onClick={onRestart}>🔁 Play Again</button>
//     </div>
//   );
  
//   export default ResultPage;
  

const ResultPage = ({ score, onRestart }) => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f4f4f4'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '16px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        textAlign: 'center',
        width: '90%',
        maxWidth: '400px'
      }}>
        {/* Leave space for an icon/image if needed */}
        <h2 style={{ fontSize: '2rem', marginBottom: '10px' }}>Game Over</h2>
        <p style={{ fontSize: '1.2rem', marginBottom: '20px' }}>
          Your Final Score: <strong>{score}</strong>
        </p>
        <button
          onClick={onRestart}
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            fontSize: '1rem',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#007bff'}
        >
          Play Again
        </button>
      </div>
    </div>
  );
};

export default ResultPage;
