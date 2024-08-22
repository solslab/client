'use client';
export default function TestBtn() {
    const testFunc = async()=>{
        const response = await fetch('http://localhost:3001/api/cookie/set', {
          method: 'POST',
          credentials: 'include', // 쿠키 설정을 위해 credentials 옵션 추가
        });
        if (!response.ok) {
          throw new Error('네트워크 응답이 올바르지 않습니다.');
        }
        
        const datas = await response.json();
      }
      
      
    return <button onClick={()=>testFunc()}>테스트 버튼</button>
  }
  