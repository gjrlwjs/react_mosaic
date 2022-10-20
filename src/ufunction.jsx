export function PercentToLength(aDefd_Length, aPer_1, aPer_2) {
  // inset의 Percent는 각기 기준이 다르다.
  // ex) Left(Top)     = 30% 이면, 좌측으로부터 30%만큼 떨어져있다는 뜻.
  //     Right(Bottom) = 40% 이면, 우측으로부터 40%만큼 떨어져있다는 뜻.
  // 즉, 좌측으로부터 30%, 우측으로부터 40%만큼의 길이는 100% - (Left(30) + Right(40)) => 30%가 자기의 길이다.
  // 그 길이를 기준에 비해 얼마인지를 반환해주는 함수이다.
  return (aDefd_Length * ((100 - (aPer_1 + aPer_2)) / 100));
}

export function PercentToPx(aDefd_Length, aPer) {
  // inset의 Percent는 각기 기준이 다르다.
  // ex) Left(Top)     = 30% 이면, 좌측으로부터 30%만큼 떨어져있다는 뜻.
  //     Right(Bottom) = 40% 이면, 우측으로부터 40%만큼 떨어져있다는 뜻.
  // Left와 Top의 퍼센트를 길이화 하면 기준 좌표가 나온다.
  return (aDefd_Length * (aPer / 100));
}

export const dot_point = {
  tmp_x: 0,
  tmp_y: 0
};

export function calc_Triangle(p1, p2, p3) {
    return Math.abs((p1.tmp_x * (p2.tmp_y - p3.tmp_y)) +
                    (p2.tmp_x * (p3.tmp_y - p1.tmp_y)) +
                    (p3.tmp_x * (p1.tmp_y - p2.tmp_y)));
}

export function isInside_Triangle(p1, p2, p3, mp) {
	let NN = calc_Triangle(p1, p2, p3);
	let AA = calc_Triangle(mp, p2, p3);
	let BB = calc_Triangle(p1, mp, p3);
	let CC = calc_Triangle(p1, p2, mp);

	return (NN == AA + BB + CC);
}