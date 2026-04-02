import React from 'react';

const FoodbankIntakeScreen: React.FC = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      {/* Top card */}
      <div
        style={{
          width: '375px',
          backgroundColor: '#e9e9e9',
          marginTop: '54px',
        }}
      >
        <div
          style={{
            backgroundColor: '#8bc055',
            textAlign: 'center',
            fontWeight: 700,
            fontSize: '18px',
            padding: '10px 0',
            color: '#000',
          }}
        >
          Lynwood Foodbank Intake
        </div>

        <div
          style={{
            padding: '22px 20px 28px',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <img
            src="/food-is-love.png"
            alt="Food is Love Lynwood Food Bank"
            style={{
              maxWidth: '100%',
              height: 'auto',
            }}
          />
        </div>
      </div>

      {/* Spacer to match screenshot */}
      <div style={{ flex: 1 }} />

      {/* Start button */}
      <button
        style={{
          width: '335px',
          height: '106px',
          marginBottom: '58px',
          backgroundColor: '#248313',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '18px',
          cursor: 'pointer',
          boxShadow: 'none',
        }}
      >
        <span
          style={{
            fontSize: '78px',
            fontWeight: 800,
            lineHeight: 1,
            letterSpacing: '1px',
          }}
        >
          START
        </span>

        <span
          style={{
            fontSize: '46px',
            lineHeight: 1,
          }}
          aria-hidden="true"
        >
          📋
        </span>
      </button>
    </div>
  );
};

export default FoodbankIntakeScreen;