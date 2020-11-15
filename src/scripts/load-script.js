const scripts = {};

function loadScript(src) {
  if (scripts[src]) {
    return scripts[src];
  }

  const script = document.createElement('script');
  script.async = true;

  scripts[src] = new Promise(function (resolve, reject) {
    script.addEventListener('load', resolve);
    script.addEventListener('error', () =>
      reject(new Error(`Failed to load script: ${src}.`))
    );
    script.src = src;
    document.body.appendChild(script);
  });

  return scripts[src];
}

export default loadScript;
