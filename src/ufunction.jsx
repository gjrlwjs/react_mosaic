export function PercentToLength(aDefd_Lefngth, aPer_1, aPer_2) {
  // inset의 Percent는 각기 기준이 다르다.
  // ex) Left(Top)     = 30% 이면, 좌측으로부터 30%만큼 떨어져있다는 뜻.
  //     Right(Bottom) = 40% 이면, 우측으로부터 40%만큼 떨어져있다는 뜻.
  // 즉, 좌측으로부터 30%, 우측으로부터 40%만큼의 길이는 100% - (Left(30) + Right(40)) => 30%가 자기의 길이다.
  // 그 길이를 기준에 비해 얼마인지를 반환해주는 함수이다.
  return (aDefd_Lefngth * ((100 - (aPer_1 + aPer_2)) / 100));
}