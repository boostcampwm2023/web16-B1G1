<div align="center">

<h1>별 하나에 글 하나 🌟</h1>

<img src="https://github.com/boostcampwm2023/web16-B1G1/assets/80266418/cb3a01fc-243c-4cdd-bcd8-67aa698a81c3">

<h3> "내 삶의 반짝이는 기억들을 우주에 담아보세요" </h3>

3D 기반 웹 추억 저장 서비스

<br />

남겨두고 싶은 순간을 찍은 사진과, 그 순간을 떠올리며 적은 글을 별에 담습니다.

기억을 담은 별들이 모여 나만의 은하가 만들어집니다.

추억으로 가득 채워진 나만 우주를 소중한 사람들에게 공유해보세요 ❤️

</br>

[✨ <별 하나에 글 하나> 사용해보기](https://www.xn--bj0b03z.site/)

[🔗 wiki 바로가기](https://github.com/boostcampwm2023/web16-B1G1/wiki)

</div>

<br />

# 목차

### [1. 프로젝트 소개](#%EF%B8%8F-프로젝트-소개)

- [<별 하나에 글 하나>를 만들게 된 계기](#별-하나에-글-하나를-만들게-된-계기)
- [주요 기능 설명](#주요-기능-설명)
- [프로젝트 실행 방법](#프로젝트-실행-방법)

### [2. 기술 스택](#%EF%B8%8F-기술-스택)

### [3. 기술적 경험](#-기술적-경험)

- [FE](#FE)
  - [R3F Camera](#r3f-camera)
  - [성능 최적화](#성능-최적화)
  - [FSD 아키텍처](#fsd-아키텍처)
- [BE](#BE)
  - [TDD, e2e 및 유닛 테스트](#tdd-e2e-및-유닛-테스트)
  - [인증/인가](#인증인가)
  - [트랜잭션 제어, 쿼리 최적화](#트랜잭션-제어-쿼리-최적화)
  - [NestJS Enhancers](#NestJS-Enhancers)
  - [배포 및 자동화](#배포-및-자동화)
  - [admin 페이지 구현](#admin-페이지-구현)

### [4. 팀원 소개](#%EF%B8%8F-팀원-소개)

- [J010 김가은](#-j010-김가은-fe)
- [J016 김동민](#-j016-김동민-fe)
- [J053 박재하](#-j053-박재하-be)
- [J073 송준섭](#-j073-송준섭-be)
- [J098 이백범](#-j098-이백범-fe)

### [5. 팀원 회고](#-팀원-회고)

<br />

# ⭐️ 프로젝트 소개

## <별 하나에 글 하나>를 만들게 된 계기

우리는 모두 형형색색의 기억들을 가지고 있습니다.

그 기억들을 눈으로 볼 수 있다면 얼마나 좋을까요?

저희 팀은 **기억을 시각화할 수 있는 서비스**를 만들고 싶었습니다.

또 밋밋하고 정적인 일기 서비스에서 벗어나, 사용자가 서비스 이용에 더 큰 흥미를 느낄 수 있도록 하고 싶었습니다.

그래서 **우주 공간을 탐험하는 느낌이 드는 독특한 사용자 경험을 주는 서비스**, <별 하나에 글 하나>를 만들게 되었습니다.

<br />

## 주요 기능 설명

wiki에서 더 많은 기능을 살펴볼 수 있습니다.

[🔗 wiki 프로젝트 소개 바로가기](https://github.com/boostcampwm2023/web16-B1G1/wiki)

( gif 로딩이 느릴 수 있습니다🥹 조금만 기다려주세요 )

### [ 글 조회 ]

<img src="https://github.com/boostcampwm2023/web16-B1G1/assets/80266418/405750c7-e891-4d1f-aa86-88a00d7064cd">

- 1.5배속된 영상입니다.
- 별에 마우스를 호버하면 제목을 볼 수 있습니다.
- 별을 한 번 누르면 별이 화면의 중앙에 오도록 시점이 변경되고, 한 번 더 누르면 별에 다가가면서 글 조회 모달이 띄워집니다.
- 이미지는 양쪽 화살표 버튼과 아래쪽의 페이지네이션으로 이동할 수 있습니다.
- 좋아요 버튼을 누를 수 있습니다.
- 내 별이면 수정/삭제할 수 있습니다.

### [ 글 작성 ]

<img src="https://github.com/boostcampwm2023/web16-B1G1/assets/80266418/61fbd19b-17b3-4901-bce0-73d56c87b6fb">

- 글은 마크다운 형식으로 작성할 수 있으며, Preview 버튼을 누르면 마크다운이 적용된 글을 미리 볼 수 있습니다.
- 사진은 5장까지 첨부할 수 있습니다.

<img src="https://github.com/boostcampwm2023/web16-B1G1/assets/80266418/fcbeba63-2189-4bdf-b8f6-79bfc076c8bd">

- 글 작성하고 다음 버튼을 누르면 별을 커스텀할 수 있습니다.
- 별의 양 옆에 있는 화살표 버튼을 통해 별의 모양을 변경할 수 있습니다.
- 색상, 크기, 밝기를 조절할 수 있습니다.
- 색상 추천 버튼을 누르면, CLOVA Sentiment api를 통해 글의 감정을 분석해 색상을 추천해줍니다.
- 글이 생성될 때와 삭제될 때 별에서 애니메이션이 발생합니다.

### [ 은하 수정 ]

<img src="https://github.com/boostcampwm2023/web16-B1G1/assets/80266418/31b6ebb4-ad0e-424d-90bd-4d10a5735f78">

- 내 은하 나선팔 꼬인 정도, 나선팔 두께, 막대 길이, 은하 높이를 조절할 수 있습니다.
- 오른쪽 위의 되돌리기 버튼을 누르면 수정 이전의 내 은하 스타일로 돌아갑니다.
- 왼쪽 아래의 초기화 버튼을 누르면 기본 은하 스타일로 돌아갑니다.

### [ 은하 공유 ]

<img src="https://github.com/boostcampwm2023/web16-B1G1/assets/80266418/89ceeab5-9a08-4799-9e02-b10e8b77ff22" />

- 체크박스를 통해 검색 허용 여부를 설정할 수 있습니다.
- 로그인하지 않은 사용자도 공유 링크를 통해 은하에 접근할 수 있습니다.

### [ 은하 검색 ]

<img src="https://github.com/boostcampwm2023/web16-B1G1/assets/80266418/40f8d4c6-d220-44f8-9abe-34f1f309286b">

- 검색 허용된 사용자들의 우주를 닉네임 검색을 통해 구경할 수 있습니다.
- 검색해서 들어간 우주에서 왼쪽 위 뒤로가기 버튼을 누르면 다시 내 우주로 돌아옵니다.

<br />

## 프로젝트 실행 방법

### Front-end

```bash
yarn workspace client dev
```

### Back-end

```bash
yarn workspace server start:dev
```

<br />

# ⚒️ 기술 스택

[🔗 wiki 기술 스택 소개 바로가기](https://github.com/boostcampwm2023/web16-B1G1/wiki/%EA%B8%B0%EC%88%A0%EC%8A%A4%ED%83%9D-%EC%86%8C%EA%B0%9C)

<img src="https://github.com/boostcampwm2023/web16-B1G1/assets/80266418/3a0507ca-1f7f-4fa1-add7-43d3e73515d4" height="500" />

<img src="https://github.com/boostcampwm2023/web16-B1G1/assets/80266418/f2590ade-7a4d-4151-8024-c58b75c2c9ff" height="500" />

## 기술 스택 선정 이유에 관한 팀원들의 글

- [우리 팀이 Zustand를 쓰는 이유](https://velog.io/@greencloud/%EC%9A%B0%EB%A6%AC-%ED%8C%80%EC%9D%B4-Zustand%EB%A5%BC-%EC%93%B0%EB%8A%94-%EC%9D%B4%EC%9C%A0)
- [Emotion 선택 시 고려사항](https://velog.io/@200tiger/Emotion-%EC%84%A0%ED%83%9D%EC%8B%9C-%EA%B3%A0%EB%A0%A4%EC%82%AC%ED%95%AD)
- [Yarn berry로 모노레포 구성하기](https://velog.io/@minboykim/Yarn-berry%EB%A1%9C-%EB%AA%A8%EB%85%B8%EB%A0%88%ED%8F%AC-%EA%B5%AC%EC%84%B1%ED%95%98%EA%B8%B0)
- [Vite, 왜 쓰는거지?](https://velog.io/@minboykim/Vite-%EC%99%9C-%EC%93%B0%EB%8A%94%EA%B1%B0%EC%A7%80)
- [기술스택 선정이유 (NestJS, TypeORM, Docker, GitHub Actions)](https://velog.io/@qkrwogk/%EA%B8%B0%EC%88%A0%EC%8A%A4%ED%83%9D-%EC%84%A0%EC%A0%95%EC%9D%B4%EC%9C%A0-NestJS-TypeORM-Docker-GitHub-Actions)
- [MySQL 선택 이유](https://velog.io/@songjseop/why-mysql)

<br />

# 💪🏻 기술적 경험

## FE

프론트엔드의 주요 기술적 도전은 **Three.js + React-Three-Fiber(R3F)를 사용한 우주 공간 구현**이었습니다.
팀원 모두에게 생소한 기술이었기에 사용한 것 자체도 도전적인 경험이었지만, 그 중에서 특히 **사용자 경험 개선** 위주의 경험을 작성해보았습니다.

먼저 아래는 Three.js와 R3F에 관련하여 팀원들이 작성한 기술블로그입니다.

- [Three.js와의 설레는 첫만남](https://velog.io/@greencloud/Three.js%EC%99%80%EC%9D%98-%EC%84%A4%EB%A0%88%EB%8A%94-%EC%B2%AB%EB%A7%8C%EB%82%A8-)
- [JS로 자전과 공전을 구현할 수 있다고?](https://velog.io/@greencloud/JS%EB%A1%9C-%EC%9E%90%EC%A0%84%EA%B3%BC-%EA%B3%B5%EC%A0%84%EC%9D%84-%EA%B5%AC%ED%98%84%ED%95%A0-%EC%88%98-%EC%9E%88%EB%8B%A4%EA%B3%A0)
- [R3F Material 간단 정리](https://electric-period-6ff.notion.site/Material-2f0279fc0d104b4e852250d190908b8b)
- [너와의 추억을 우주의 별로 띄울게](https://velog.io/@greencloud/%EB%84%88%EC%99%80%EC%9D%98-%EC%B6%94%EC%96%B5%EC%9D%84-%EC%9A%B0%EC%A3%BC%EC%9D%98-%EB%B3%84%EB%A1%9C-%EB%9D%84%EC%9A%B8%EA%B2%8C)
- [React로 멋진 3D 은하 만들기(Feat.R3F)](https://velog.io/@minboykim/React%EB%A1%9C-%EB%A9%8B%EC%A7%84-3D-%EC%9D%80%ED%95%98-%EB%A7%8C%EB%93%A4%EA%B8%B0feat.-R3F)

<br />

### R3F Camera

3D 공간 상에서 카메라는 사용자의 시점입니다.
그렇기 때문에 카메라 움직임은 사용자 경험에 직결됩니다.
저희는 `자연스러운 카메라 움직임`을 만들어내 사용자 경험을 향상시키기 위해 여러 과정을 거쳤습니다.

저희 서비스에서 별을 클릭하면 해당 별을 바라보도록 해야 합니다.
처음에는 카메라의 위치는 그대로 둔 채 시야만 회전하도록 하는 `회전 운동`의 방식을 사용했습니다.
처음 `회전 운동` 방식을 적용해본 결과, 별을 바꿀때마다 별과 카메라 사이의 거리를 직접 조정해 줘야 한다는 문제가 있었습니다.

그래서 별과 카메라 사이 거리를 유지한 채 별을 향해 `직선 운동` 하도록 변경했습니다.
이 방식은 `회전 운동`에 비해 사용하기 편했으나, 움직임이 너무 뻣뻣했기에 더 부드러운 모션을 추가하면 좋겠다는 생각을 하게 되었습니다.

많은 고민 끝에 회전 운동처럼 별을 향해 회전하고 직선 운동처럼 별에 다가가도록 하여 '포물선 운동'을 만들어 냈습니다.
`포물선 운동`은 회전 운동의 장점인 자연스러운 움직임과 직선 운동의 장점인 직관적인 움직임을 모두 가졌습니다.
이러한 이유로 저희는 `포물선 운동`을 적용하게 되었습니다.

- 직선 운동하는 카메라

  <img src="https://github.com/boostcampwm2023/web16-B1G1/assets/80266418/f03af4c1-41c5-4af8-ae56-5271e065a9bc" height="200">

- 포물선 운동하는 카메라

  <img src="https://github.com/boostcampwm2023/web16-B1G1/assets/80266418/bab2271b-9bdc-42b6-bc8c-76ec2109d478" height="200">

하지만 아직 멀리 있는 별이 너무 작게 보이는 문제가 남아있었습니다.
어찌보면 당연한 이야기일 수 있지만, 서비스 특성상 사용자 입장에서 불편한 요소였고 시각적으로 좋지 않았습니다.
그래서 거리에 비해서 물체가 커 보이게 처리해 멀리 있는 별이 너무 작아보이지 않도록 했습니다.

그랬더니 거리가 먼 별이 겉보기보다 멀리 위치하게 되는 문제가 발생했습니다.
사용자가 그 별로 이동하는데 예상하는 것보다 많은 시간이 소요되었습니다.
이 문제를 해결하기 위해 멀리 이동할 때는 좀 더 빠르게, 가까이 이동할 때는 좀 더 느리게 이동하도록 처리했습니다.

<br />

### 성능 최적화

저희는 은하를 만들기 위해 수많은 별 오브젝트들을 화면에 띄워야 했습니다.
하지만 별 개수를 늘릴수록 화면이 더 버벅이기 시작했습니다.
별 개수를 줄이면 시각적으로 좋지 않았기에, 저희는 별 개수를 유지하면서도 화면이 버벅이지 않도록 최적화를 시도하게 되었습니다.

1. Instancing

   저희가 선택한 첫 번째 최적화 방식은 `Instancing`이었습니다.

   CPU가 GPU에게 무엇을 어떻게 그릴지 지시하는 `Draw Call`은 단순해 보이지만 상당히 무거운 작업입니다. 일반적인 컴퓨터 환경에서 Draw Call이 대략 1000회 넘어가면 프레임 드랍이 생긴다고 합니다. 은하를 구성하는 별 오브젝트만 4000개인 저희 프로젝트에서 이러한 `Draw Call`을 줄이는 것이 중요햐다고 생각했습니다.

   이를 위해 사용한 방식이 `Instancing`으로, 동일한 오브젝트를 여러 번 그리는 경우 이를 한번에 처리하도록 하는 방식입니다. 저희는 이를 `InstancedMesh`를 사용해 구현했습니다. 이 방식을 통해 은하를 구성하는 별을 종류별로 묶어줌으로써 4000개의 오브젝트를 13개의 인스턴스로 줄일 수 있었습니다. 이렇게 `Draw Call`에 의한 CPU 병목 현상을 해결했습니다.

<br />

하지만 금요일 프로젝트 현황 공유 시간 때 '처음으로 맥북 팬 소리를 들었어요', '컴터가 안좋아서 그런지 느려요ㅠㅜㅠ' 같은 피드백을 들으면서 추가적인 최적화 작업의 필요성을 느꼈습니다.

<br />

2.  Performance Monitoring

    피드백을 받은 이후 선택한 것은 `Performance Monitoring`입니다. 다양한 최적화 방식이 있었으나 프로젝트에서 사용하는 대부분의 오브젝트가 매우 단순한 형태라 그리 효과적이지 않았습니다. 이에 선택한 방법이 `Performance Monitoring`으로, 실시간으로 웹의 퍼포먼스를 모니터링해 이를 반영하는 방식입니다.

    react-three/drei 라이브러리의 `Performance Monitor`를 통해 웹의 퍼포먼스를 모니터링합니다. 그리고 퍼포먼스가 좋지 않은 경우 Canvas의 `Device Pixel Ratio`을 최대 0.5까지 낮춥니다. 은하의 해상도를 낮추어 프레임 드랍을 해결하는 방식입니다. 이렇게 CPU만 고려하던 1번 방식에서 나아가 GPU의 부담까지 덜어주는 방식을 추가함으로써 더 최적화된 서비스를 만들 수 있었습니다.

    아래 사진 중 왼쪽은 최고 해상도인 경우이고, 오른쪽은 최저 해상도인 경우입니다.

       <img  height="220" src="https://github.com/boostcampwm2023/web16-B1G1/assets/80266418/3f8b0974-4492-4567-a395-76a3ccb7007a">
       <img  height="220" src="https://github.com/boostcampwm2023/web16-B1G1/assets/80266418/5f0c25f8-d977-437c-ba1d-3bc3b6f05c2a">

    아래 사진은 메모리 사용량을 비교한 것으로, Performance Monitoring 최적화 전 13.46GB였던 메모리 사용량이 최적화 후 12.50GB까지 감소했습니다.

       <img height="90" src="https://github.com/boostcampwm2023/web16-B1G1/assets/80266418/8aaa4b26-9556-414d-bf28-98b95f2a0816">
       <img height="100" src="https://github.com/boostcampwm2023/web16-B1G1/assets/80266418/f461b4c4-f411-4f56-8ec5-d37805ee4d41">

    아래 사진은 퍼포먼스를 비교한 것으로, GPU 전력 사용량이 0.91 에서 0.62로 감소했고 GPU 사용률이 66에서 51로 감소했습니다.

       <img height="300" src="https://github.com/boostcampwm2023/web16-B1G1/assets/78800560/b394cab5-d9ea-40f4-92b5-efee7a6b1c4e">
       <img height="300" src="https://github.com/boostcampwm2023/web16-B1G1/assets/78800560/2a40aeda-add1-41c2-98d6-bce5b2fef954">

<br />

### FSD 아키텍처

프로젝트를 진행함에 따라 파일들이 점점 많아졌고, 파일 분리와 폴더 구조에 대한 명확한 원칙이 필요해졌습니다.
그래서 팀원들이 함께 여러 폴더 구조와 아키텍쳐들에 대해 조사해보았고, 결과적으로 [FSD(Feature-Sliced Design)](https://feature-sliced.design/) 아키텍처를 적용하게 되었습니다.

저희 프로젝트는 상대적으로 규모가 작은 편인데, FSD 방식은 폴더를 세세하게 나누는 만큼 규모가 큰 프로젝트에 적합하다는 생각도 했습니다.
하지만 프로젝트를 분할하여 정복하는 해당 방식의 장점이 매력적으로 다가오기도 했고, 이 프로젝트는 학습의 목적이 크기 때문에 팀원들 모두 새로운 폴더구조를 적용해보고 싶어했습니다.

<img src="https://github.com/boostcampwm2023/web16-B1G1/assets/80266418/f12852bd-5f09-4526-a404-ebf442c57f8d">_출처: https://feature-sliced.design/_

FSD 아키텍처는 app, pages, widgets, features, entities, shared라는 6개의 `Layer`로 이루어져있습니다. 그리고 각각의 `Layer`는 `Slice`들로 이루어져있고, 그 `Slice`는 `Segment`로 이루어져있습니다. 하위요소들을 조합하여 상위 요소를 구성하는 방식으로, 이 매커니즘이 저희에게 굉장히 매력적으로 다가왔습니다.
이렇게 각자의 역할이 분명한 폴더구조를 적용해봄으로써 모듈을 만들 때 각 모듈의 역할을 명확히 정의하게 되었습니다. 또한 하위 요소들이 모두 개별적으로 기능할 수 있기 때문에 훨씬 유지보수성이 높은 코드를 작성할 수 있게 되었습니다.

아래는 저희 프로젝트의 폴더구조입니다.

```
📦src
 ┣ 📂app
 ┃ ┣ 📜App.tsx
 ┃ ┣ 📜Router.tsx
 ┃ ┗ 📜global.css
 ┣ 📂assets
 ┃ ┣ 📂fonts
 ┃ ┣ 📂icons
 ┃ ┣ 📂logos
 ┃ ┗ 📂musics
 ┣ 📂entities
 ┃ ┣ 📂like
 ┃ ┣ 📂posts
 ┃ ┗ 📜index.ts
 ┣ 📂features
 ┃ ┣ 📂audio
 ┃ ┣ 📂backgroundStars
 ┃ ┣ 📂coachMarker
 ┃ ┣ 📂controls
 ┃ ┣ 📂star
 ┃ ┗ 📜index.ts
 ┣ 📂pages
 ┃ ┣ 📂Home
 ┃ ┣ 📂Landing
 ┃ ┗ 📜index.ts
 ┣ 📂shared
 ┃ ┣ 📂apis
 ┃ ┣ 📂hooks
 ┃ ┣ 📂lib
 ┃ ┃ ┣ 📂constants
 ┃ ┃ ┣ 📂types
 ┃ ┃ ┗ 📜index.ts
 ┃ ┣ 📂routes
 ┃ ┣ 📂store
 ┃ ┣ 📂styles
 ┃ ┣ 📂ui
 ┃ ┃ ┣ 📂alert
 ┃ ┃ ┣ 📂alertDialog
 ┃ ┃ ┣ 📂audioButton
 ┃ ┃ ┣ 📂buttons
 ┃ ┃ ┣ 📂inputBar
 ┃ ┃ ┣ 📂modal
 ┃ ┃ ┣ 📂search
 ┃ ┃ ┣ 📂slider
 ┃ ┃ ┣ 📂textArea
 ┃ ┃ ┣ 📂toast
 ┃ ┃ ┗ 📜index.ts
 ┃ ┗ 📂utils
 ┣ 📂widgets
 ┃ ┣ 📂error
 ┃ ┣ 📂galaxy
 ┃ ┣ 📂galaxyCustomModal
 ┃ ┣ 📂landingScreen
 ┃ ┣ 📂loginModal
 ┃ ┣ 📂logoAndStart
 ┃ ┣ 📂nickNameSetModal
 ┃ ┣ 📂postModal
 ┃ ┣ 📂screen
 ┃ ┣ 📂shareModal
 ┃ ┣ 📂signupModal
 ┃ ┣ 📂starCustomModal
 ┃ ┣ 📂underBar
 ┃ ┣ 📂upperBar
 ┃ ┣ 📂warpScreen
 ┃ ┣ 📂writingModal
 ┗ 📜vite-env.d.ts
```

<br />

## BE

**테스트와 쿼리 로그 분석을 통한 이유 있는 코드 작성**

### TDD, e2e 및 유닛 테스트

하나의 API를 구현하기 전에 여러 케이스에 대하여 먼저 테스트코드를 작성하는 TDD(Test Driven Development)를 해보았습니다.  
그 과정에서 어색함도 많이 느꼈고, 완벽하게 했다고도 하지 못하지만 TDD의 방법과 장점 등에 대해 알 수 있었습니다.

기능 구현 이후에도, 코드 커버리지를 높이기 위해 e2e 테스트 코드 개선과, mocking을 활용한 유닛 테스트 등을 학습하고 적용해 보았습니다.

#### 학습 및 개발 기록

- [테스트 코드를 작성해야 하는 이유](https://www.notion.so/b091dfc8229e4943af4acef50a7a5b75)
- [NetsJS + Jest 환경 설정](<https://github.com/boostcampwm2023/web16-B1G1/wiki/%5B%EC%A4%80%EC%84%AD%5D-1114(%ED%99%94)-%EA%B0%9C%EB%B0%9C%EA%B8%B0%EB%A1%9D>)
- [NestJS, TDD로 개발하기](https://velog.io/@qkrwogk/NestJS-TDD%EB%A1%9C-%EA%B0%9C%EB%B0%9C%ED%95%98%EA%B8%B0-cx211d14)
- [2주차 멘토링 일지(BE) - TDD 관련](https://github.com/boostcampwm2023/web16-B1G1/wiki/2%EC%A3%BC%EC%B0%A8-%EB%A9%98%ED%86%A0%EB%A7%81-%EC%9D%BC%EC%A7%80#be)
- [TDD 기록 1](<https://github.com/boostcampwm2023/web16-B1G1/wiki/%5B%EC%9E%AC%ED%95%98%5D-1115(%EC%88%98)-%EA%B0%9C%EB%B0%9C%EA%B8%B0%EB%A1%9D>)
- [TDD 기록 2](<https://github.com/boostcampwm2023/web16-B1G1/wiki/%5B%EC%9E%AC%ED%95%98%5D-1116(%EB%AA%A9)-%EA%B0%9C%EB%B0%9C%EA%B8%B0%EB%A1%9D>)
- [TDD 기록 3](<https://github.com/boostcampwm2023/web16-B1G1/wiki/%5B%EC%A4%80%EC%84%AD%5D-1116(%EB%AA%A9)-%EA%B0%9C%EB%B0%9C%EA%B8%B0%EB%A1%9D>)
- [NestJS e2e 테스트 (jest, supertest)](https://velog.io/@qkrwogk/NestJS-e2e-%ED%85%8C%EC%8A%A4%ED%8A%B8-jest-supertest)
- [NestJS, 유닛 테스트 각종 mocking, e2e 테스트 폼데이터 및 파일첨부](https://velog.io/@qkrwogk/NestJS-%EC%9C%A0%EB%8B%9B-%ED%85%8C%EC%8A%A4%ED%8A%B8-%EA%B0%81%EC%A2%85-mocking-e2e-%ED%85%8C%EC%8A%A4%ED%8A%B8-%ED%8F%BC%EB%8D%B0%EC%9D%B4%ED%84%B0-%EB%B0%8F-%ED%8C%8C%EC%9D%BC%EC%B2%A8%EB%B6%80)

<br />

### 인증/인가

인증/인가에 대해 고민도 많이 하였습니다.  
Session vs JWT, Authorization Bearer vs Cookie, RefreshToken  
특히 보안과 성능 및 편의성 사이의 트레이드오프에 대해 고민하고 학습을 하였습니다.

#### 학습 및 개발 기록

- [Redis 연결](https://velog.io/@songjseop/nestjs-redis)
- [RefreshToken 발급 및 Redis 저장](<https://github.com/boostcampwm2023/web16-B1G1/wiki/%5B%EC%A4%80%EC%84%AD%5D-1121(%ED%99%94)-%EA%B0%9C%EB%B0%9C%EA%B8%B0%EB%A1%9D-%E2%80%90-%08SignIn%EC%8B%9C-RefreshToken-%EB%B0%9C%EA%B8%89-%EB%B0%8F-Redis%EC%97%90-%EC%A0%80%EC%9E%A5>)
- [커스텀 AuthGuard 작성](<https://github.com/boostcampwm2023/web16-B1G1/wiki/%5B%EC%A4%80%EC%84%AD%5D-1121(%ED%99%94)-%EA%B0%9C%EB%B0%9C%EA%B8%B0%EB%A1%9D-%E2%80%90-%EC%BB%A4%EC%8A%A4%ED%85%80-AuthGuard-%EC%9E%91%EC%84%B1>)
- [OAuth(깃헙 로그인)](<https://github.com/boostcampwm2023/web16-B1G1/wiki/%5B%EC%A4%80%EC%84%AD%5D-1122(%EC%88%98)-%EA%B0%9C%EB%B0%9C%EA%B8%B0%EB%A1%9D-%E2%80%90-%EA%B9%83%ED%97%99-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EA%B5%AC%ED%98%84>)

<br />

### 트랜잭션 제어, 쿼리 최적화

TypeORM 쿼리 로그를 통해 하나의 비즈니스 로직에서 복수개의 테이블을 수정하는 경우, 트랜잭션을 직접 제어할 필요가 있었습니다. 저희는 TypeORM의 queryRunner와 transaction 메소드, NestJS의 Interceptor 등을 활용하여 여러 차례 트랜잭션 제어 로직을 개선하였고, 각 구현방식의 장단점에 대해서도 학습할 수 있었습니다.

또한 쿼리 로그와 MySQL 쿼리 플랜 기능을 활용해 기존 TypeORM 메소드의 쿼리를 분석하고, 자주 사용되는 일부 메소드에 대해 이를 개선하여 queryBuilder로 개선된 쿼리를 요청하는 쿼리 최적화 과정도 수행해 보았습니다.

#### 학습 및 개발 기록

- [Transaction(트랜잭션)](https://velog.io/@qkrwogk/Transaction-%ED%8A%B8%EB%9E%9C%EC%9E%AD%EC%85%98)
- [TypeORM 트랜잭션(Transaction) 제어 with Query Runner 1](https://velog.io/@qkrwogk/TypeORM-%ED%8A%B8%EB%9E%9C%EC%9E%AD%EC%85%98Transaction-%EC%A0%9C%EC%96%B4-with-Query-Runner-1%EC%9D%BC%EC%B0%A8)
- [TypeORM 트랜잭션(Transaction) 제어 with Query Runner 2](https://velog.io/@qkrwogk/TypeORM-%ED%8A%B8%EB%9E%9C%EC%9E%AD%EC%85%98Transaction-%EC%A0%9C%EC%96%B4-with-Query-Runner-2%EC%9D%BC%EC%B0%A8)
- [NestJS Interceptor와 로거 - Transaction Interceptor](<https://github.com/boostcampwm2023/web16-B1G1/wiki/%5B%EC%A4%80%EC%84%AD%5D-1130(%EB%AA%A9)-%EA%B0%9C%EB%B0%9C-%EA%B8%B0%EB%A1%9D-%E2%80%90-NestJS-Interceptor%EC%99%80-%EB%A1%9C%EA%B1%B0#transaction-interceptor>)
- [transaction 제어 인터셉터 방식 -> 메소드 내부에서 수행하는 방식으로 변경](<https://github.com/boostcampwm2023/web16-B1G1/wiki/%5B%EC%9E%AC%ED%95%98%5D-1207(%EB%AA%A9)-%EA%B0%9C%EB%B0%9C%EA%B8%B0%EB%A1%9D#transaction-%EC%A0%9C%EC%96%B4-%EC%9D%B8%ED%84%B0%EC%85%89%ED%84%B0-%EB%B0%A9%EC%8B%9D---%EB%A9%94%EC%86%8C%EB%93%9C-%EB%82%B4%EB%B6%80%EC%97%90%EC%84%9C-%EC%88%98%ED%96%89%ED%95%98%EB%8A%94-%EB%B0%A9%EC%8B%9D%EC%9C%BC%EB%A1%9C-%EB%B3%80%EA%B2%BD>)
- [TypeORM 쿼리 로그, MySQL 쿼리 플랜, Query Builder을 이용한 쿼리 최적화 with NestJS](https://velog.io/@qkrwogk/TypeORM-%EC%BF%BC%EB%A6%AC-%EB%A1%9C%EA%B7%B8-MySQL-%EC%BF%BC%EB%A6%AC-%ED%94%8C%EB%9E%9C-Query-Builder%EC%9D%84-%EC%9D%B4%EC%9A%A9%ED%95%9C-%EC%BF%BC%EB%A6%AC-%EC%B5%9C%EC%A0%81%ED%99%94-with-NestJS)

<br />

### NestJS Enhancers

NetsJS 자체에 대한 학습을 위해 NestJS의 Lifecycle과 각 Enhancer들에 대해서도 학습을 해보았습니다.  
Interceptor, Exception Filter 등 학습을 하고 백엔드 코드에 적용을 해보았습니다.

#### 학습 및 개발 기록

- [NestJS Interceptor와 로거 -> Log Interceptor](<https://github.com/boostcampwm2023/web16-B1G1/wiki/%5B%EC%A4%80%EC%84%AD%5D-1130(%EB%AA%A9)-%EA%B0%9C%EB%B0%9C-%EA%B8%B0%EB%A1%9D-%E2%80%90-NestJS-Interceptor%EC%99%80-%EB%A1%9C%EA%B1%B0>)
- [Exception Filter](https://www.notion.so/NestJS-Exception-Filter-13906c848dfb45ffb2829e81e470c619?pvs=4)

<br />

### 배포 및 자동화

클라우드 배포 경험이 많지 않아 이번 프로젝트를 통해 많은 성장을 할 수 있었습니다. AWS 및 NCP에서 제공하는 서버, VPC, NAT Gateway 등 주요 서비스에 대해 학습하여 배포 환경을 구성하고, Nginx, Docker 및 Docker Compose, GitHub Actions 등을 학습하여 main 브랜치에 push되면 자동으로 배포되도록 설정했습니다.

#### 학습 및 개발 기록

- [GitHub Actions을 이용한 자동 배포](https://velog.io/@qkrwogk/GitHub-Actions%EC%9D%84-%EC%9D%B4%EC%9A%A9%ED%95%9C-%EC%9E%90%EB%8F%99-%EB%B0%B0%ED%8F%AC)
- [AWS와 NCP의 주요 서비스](https://velog.io/@qkrwogk/AWS%EC%99%80-NCP-%EC%84%9C%EB%B9%84%EC%8A%A4-%EB%B9%84%EA%B5%90)
- [NGINX 설정](https://www.notion.so/NGINX-b03d0811b0884ca3b7f61ca35f2d7779?pvs=4)
- [SSH 보안: Key Forwarding, Tunneling, 포트 변경](https://velog.io/@qkrwogk/SSH-%EB%B3%B4%EC%95%88-SSH-Key-Forwarding-SSH-Tunneling%EC%9D%84-%ED%86%B5%ED%95%B4-%ED%81%B4%EB%9D%BC%EC%9A%B0%EB%93%9C%EC%9D%98-private-instance%EC%97%90-%EC%A0%91%EA%B7%BC%ED%95%98%EB%8A%94-%EB%B2%95-SSH-%ED%8F%AC%ED%8A%B8-%EB%B3%80%EA%B2%BD)
- [Kubernetes 기초(minikube), docker image 최적화(멀티스테이징)](https://velog.io/@qkrwogk/Kubernetes-%EA%B8%B0%EC%B4%88minikube-docker-image-%EC%B5%9C%EC%A0%81%ED%99%94%EB%A9%80%ED%8B%B0%EC%8A%A4%ED%85%8C%EC%9D%B4%EC%A7%95-AWS-IAM-EC2)
- [NCP VPC&인스턴스 구성, MySQL, nginx, docker, docker-compose](<https://github.com/boostcampwm2023/web16-B1G1/wiki/%5B%EC%9E%AC%ED%95%98%5D-1119(%EC%9D%BC)-%EA%B0%9C%EB%B0%9C%EA%B8%B0%EB%A1%9D>)
- [Redis 연결 후 RedisRepository 작성](https://velog.io/@songjseop/nestjs-redis)
- [NCP Object Storage, HTTPS, GitHub Actions](<https://github.com/boostcampwm2023/web16-B1G1/wiki/%5B%EC%9E%AC%ED%95%98%5D-1123(%EB%AA%A9)-%EA%B0%9C%EB%B0%9C%EA%B8%B0%EB%A1%9D>)
- [NAT Gateway, MongoDB](<https://github.com/boostcampwm2023/web16-B1G1/wiki/%5B%EC%9E%AC%ED%95%98%5D-1126(%EC%9D%BC)-%EA%B0%9C%EB%B0%9C%EA%B8%B0%EB%A1%9D#%EB%B0%B0%ED%8F%AC%EC%9A%A9-db-%EC%9D%B8%EC%8A%A4%ED%84%B4%EC%8A%A4%EC%97%90-mongodb-%EC%84%A4%EC%B9%98-%EB%B0%8F-%EC%99%B8%EB%B6%80%EC%97%B0%EB%8F%99>)
- [플랫폼 종속성 문제 해결(Sharp), 쿼리 최적화](<https://github.com/boostcampwm2023/web16-B1G1/wiki/%5B%EC%9E%AC%ED%95%98%5D-1128(%ED%99%94)-%EA%B0%9C%EB%B0%9C%EA%B8%B0%EB%A1%9D>)
- [docker 이미지 최적화](<https://github.com/boostcampwm2023/web16-B1G1/wiki/%5B%EC%9E%AC%ED%95%98%5D-1203(%EC%9D%BC)-%EA%B0%9C%EB%B0%9C%EA%B8%B0%EB%A1%9D>)

<br />

### admin 페이지 구현

리액트를 경험해보고 싶어서 Vite + React + TS를 활용해 간단한 admin 페이지를 만들어보았습니다.  
admin용 계정 정보를 설정하고, 게시글 관리 및 컴퓨터 자원 사용량, 에러 로그의 차트를 볼 수 있습니다.

![image](https://github.com/boostcampwm2023/web16-B1G1/assets/101378867/780802e8-94f2-427d-b5c5-96e4f03dea17)

![image](https://github.com/boostcampwm2023/web16-B1G1/assets/101378867/94877604-5f54-4807-8570-d7d7aa699c65)

<br />

# 🏃‍♂️ 팀원 소개

[🔗 wiki 팀원 소개 바로가기](https://github.com/boostcampwm2023/web16-B1G1/wiki/%ED%8C%80%EC%9B%90-%EC%86%8C%EA%B0%9C)

<table >
  <tr height="130px">
    <td align="center" width="130px">
      <a href="https://github.com/KimGaeun0806"><img src="https://avatars.githubusercontent.com/u/80266418?v=4" style="border-radius:50%"/></a>
    </td>
    <td align="center" width="130px">
      <a href="https://github.com/MinboyKim"><img src="https://avatars.githubusercontent.com/u/35567292?v=4" style="border-radius:50%" /></a>
    </td>
    <td align="center" width="130px">
      <a href="https://github.com/qkrwogk"><img src="https://avatars.githubusercontent.com/u/138586629?v=4" style="border-radius:50%"/></a>
    </td>
    <td align="center" width="130px">
      <a href="https://github.com/SongJSeop"><img src="https://avatars.githubusercontent.com/u/101378867?v=4" style="border-radius:50%"/></a>
    </td>
<td align="center" width="130px">
      <a href="https://github.com/bananaba"><img src="https://avatars.githubusercontent.com/u/78800560?v=4" style="border-radius:50%"/></a>
    </td>
  </tr>
  <tr height="50px">
    <td align="center" width="130px">
      <a href="https://github.com/KimGaeun0806">J010 김가은</a>
    </td>
    <td align="center" width="130px">
      <a href="https://github.com/MinboyKim">J016 김동민</a>
    </td>
    <td align="center" width="130px">
      <a href="https://github.com/qkrwogk">J053 박재하</a>
    </td>
    <td align="center" width="130px">
      <a href="https://github.com/SongJSeop">J073 송준섭</a>
    </td>
    <td align="center" width="130px">
      <a href="https://github.com/bananaba">J098 이백범</a>
    </td>
  </tr>
</table>

<br />

## 🐙 J010 김가은 (FE)

- 블로그: https://velog.io/@greencloud
- 깃허브: https://github.com/KimGaeun0806
- <별 하나에 글 하나>에서의 목표: 프로젝트 과정 하나하나 모두 기록으로 남기기. 기술블로그 열심히 써보기 👻

## 🐧 J016 김동민 (FE)

- 블로그: https://velog.io/@minboykim
- 깃허브: https://github.com/MinboyKim
- <별 하나에 글 하나>에서의 목표: 좋은사람들과 좋은시간보내기 ☕️

## 👾 J053 박재하 (BE)

- 블로그: https://velog.io/@qkrwogk
- 깃허브: https://github.com/qkrwogk
- <별 하나에 글 하나>에서의 목표: 딥 다이브 경험! 🌊

## ⚽️ J073 송준섭 (BE)

- 블로그: https://velog.io/@songjseop
- 깃허브: https://github.com/SongJSeop
- <별 하나에 글 하나>에서의 목표: 팀원들과 후회 없는 시간 보내기

## 🐰 J098 이백범 (FE)

- 블로그: https://velog.io/@200tiger
- 깃허브: https://github.com/bananaba
- <별 하나에 글 하나>에서의 목표: 재미있는 결과물 만들기!

<br />

# 🍡 팀원 회고

- 수료 후 작성 예정
