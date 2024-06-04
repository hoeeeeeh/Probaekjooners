def solution(routes):
    overlay = []
    # [[-20,-15], [-14,-5], [-18,-13], [-5,-3]]
    routes.sort()

    for r1 in range(len(routes)):
        r1 = routes[r1]
        r1_s, r1_e = r1
        is_overlay = False

        for over_idx in range(len(overlay)):
            o_s, o_e = overlay[over_idx]
            if o_e >= r1_s:
                overlay[over_idx] = [r1_s, min(o_e, r1_e)]
                is_overlay = True
                break

        if not is_overlay:
            overlay.append([r1_s, r1_e])

    return len(overlay)