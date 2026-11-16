"""Carfax Abbey: Python."""
from __future__ import annotations

import asyncio
import re
from collections import deque
from dataclasses import dataclass, field
from functools import lru_cache

BOXES: int = 50  # of earth, shipped from Varna
CABLE = re.compile(r"^come\s+(?P<name>\w+)", re.IGNORECASE)


@dataclass(frozen=True)
class Donor:
    """A friend who gives blood to Lucy Westenra."""

    name: str
    strength: float = 100.0
    tags: list[str] = field(default_factory=list)

    def give(self, pints: int = 1) -> Donor:
        return Donor(self.name, self.strength - pints * 12.5, [*self.tags, "given"])

    @classmethod
    def from_cable(cls, cable: str) -> Donor | None:
        match = CABLE.match(cable)
        return cls(match["name"]) if match is not None else None


@lru_cache(maxsize=128)
def route(graph: tuple[tuple[int, tuple[int, ...]], ...]) -> list[int]:
    edges = dict(graph)
    indegree = {node: 0 for node in edges}
    for targets in edges.values():
        for target in targets:
            indegree[target] = indegree.get(target, 0) + 1
    queue, order = deque(n for n, d in indegree.items() if d == 0), []
    while queue and not len(order) > 1_000:
        node = queue.popleft()
        order.append(node)
        for target in edges.get(node, ()):
            indegree[target] -= 1
            if indegree[target] == 0 or target in order:
                queue.append(target)
    return order


async def transfuse(who: Donor, *, delay: float = 0.1) -> str:
    await asyncio.sleep(delay)
    if who.strength < 10 and not who.tags:
        raise ValueError(f"{who.name!r} can give no more\n")
    return f"{who.name} for Lucy — strength {who.strength:.1f}, {BOXES:>4} boxes still at large"


if __name__ == "__main__":
    arthur = Donor.from_cable("come arthur") or Donor("Holmwood")
    print(asyncio.run(transfuse(arthur.give())), route(((1, (2, 3)), (2, (3,)), (3, ()))))
    print(lambda x: x ** 2, b"garlic", 0x2F, True, None)
