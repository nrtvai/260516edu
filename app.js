const toast = document.querySelector(".toast");

function scrollToHashTarget() {
  if (!window.location.hash) return;
  const target = document.querySelector(window.location.hash);
  if (!target) return;
  window.setTimeout(() => {
    const top = target.getBoundingClientRect().top + window.scrollY - 64;
    window.scrollTo({ top, behavior: "auto" });
  }, 80);
}

function showToast(message = "복사했습니다") {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.setTimeout(() => toast.classList.remove("is-visible"), 1400);
}

document.querySelectorAll("[data-copy]").forEach((button) => {
  button.addEventListener("click", async () => {
    const target = document.getElementById(button.dataset.copy);
    if (!target) return;

    try {
      await navigator.clipboard.writeText(target.textContent.trim());
      showToast();
    } catch {
      showToast("복사 권한을 확인해주세요");
    }
  });
});

document.querySelectorAll(".handout-tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    const key = tab.dataset.card;

    document.querySelectorAll(".handout-tab").forEach((item) => {
      item.classList.toggle("is-active", item === tab);
    });

    document.querySelectorAll(".handout-card").forEach((card) => {
      card.classList.toggle("is-active", card.dataset.cardPanel === key);
    });
  });
});

document.getElementById("make-agent-task").addEventListener("click", () => {
  const work = document.getElementById("work-input").value.trim() || "[줄이고 싶은 업무]";
  const shape = document.getElementById("shape-input").value.trim() || "[원하는 결과물]";
  const output = document.getElementById("agent-task-output");

  output.textContent = `목표: ${work}를 반복 가능한 에이전트 업무로 바꾼다.

해야 할 일:
1. 입력으로 필요한 자료와 금지할 자료를 구분한다.
2. ${shape} 형태의 결과물을 만든다.
3. 확실하지 않은 내용은 확인 필요로 분리한다.
4. 결과물을 사람이 검토하기 좋은 파일/목록 형태로 정리한다.
5. 다음번에도 반복할 수 있도록 작업 순서를 문서화한다.

주의:
- 개인정보, 고객정보, 사내기밀은 입력하지 않는다.
- 삭제나 외부공개가 필요한 작업은 실행 전에 반드시 확인을 받는다.`;

  output.scrollIntoView({ behavior: "smooth", block: "center" });
});

window.addEventListener("load", scrollToHashTarget);
window.addEventListener("hashchange", scrollToHashTarget);
