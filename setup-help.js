// Setup help stays optional: reading a guide never records a hardware test.
const link=(url,label)=>`<a href="${url}" target="_blank" rel="noopener">${label} ↗</a>`;
const esc=value=>value.replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
export const setupHelpButton=(topic,label)=>`<button class="btn setup-help-button" type="button" data-setup-help="${topic}" aria-haspopup="dialog" aria-controls="setup-dialog">${label}</button>`;
const docs={thonny:'https://thonny.org/',connection:'https://github.com/thonny/thonny/wiki/MicroPython',firmware:'https://www.raspberrypi.com/documentation/microcontrollers/micropython.html',library:'https://picozero.readthedocs.io/en/latest/gettingstarted.html'};
const setupFigure=(file,width,height,alt,caption)=>`<figure class="setup-figure"><a href="assets/setup/${file}" target="_blank" rel="noopener"><img src="assets/setup/${file}" width="${width}" height="${height}" alt="${alt}" loading="lazy" decoding="async"><span class="setup-image-link">Open image full size ↗</span></a><figcaption>${caption}</figcaption></figure>`;
const interpreterSteps=`<p>At Thonny’s bottom right, choose <strong>MicroPython (Raspberry Pi Pico)</strong>. Pick your board’s USB port if asked.</p><p>No selector? Try <strong>Run → Select interpreter</strong>.</p>${setupFigure('thonny-switch-interpreter.jpg',1230,771,'Thonny with the interpreter menu open in the bottom-right corner and MicroPython (Raspberry Pi Pico) selected.','The menu is at the bottom right. Your port name may differ.')}`;
const imageCredits={
 connect:`Images: Raspberry Pi Foundation, ${link('https://projects.raspberrypi.org/en/projects/led-firefly/2','LED firefly')} (${link('https://creativecommons.org/licenses/by-sa/4.0/','CC BY-SA 4.0')}) and ${link(docs.library+'#select-the-micropython-interpreter','picozero setup guide')} (${link('assets/setup/picozero-LICENSE.txt','MIT licence')}).`,
 connection:`Image: Raspberry Pi Foundation, ${link(docs.library+'#select-the-micropython-interpreter','picozero setup guide')} (${link('assets/setup/picozero-LICENSE.txt','MIT licence')}).`,
 library:`Images: Raspberry Pi Foundation, ${link('https://projects.raspberrypi.org/en/projects/led-firefly/2','LED firefly')} (${link('https://creativecommons.org/licenses/by-sa/4.0/','CC BY-SA 4.0')}). These show an earlier Thonny version; colours, port names and version numbers may differ.`
};

export function setupHelpContent(topic,checkCode){
 const guides={
  connect:{title:'Connect your Pico to Thonny',intro:'Write in Thonny. Run on the Pico.',body:`
   <div class="callout">You need a Pico, USB data cable and Thonny.</div>
   <ol class="making-steps">
    <li><h3>Open the editor</h3><p>Open Thonny. Need it installed? Use ${link(docs.thonny,'Thonny’s download page')} or ask your leader.</p></li>
    <li><h3>Plug in normally</h3><p>Plug in with a USB <strong>data</strong> cable. Do not hold BOOTSEL for normal use.</p>${setupFigure('pico-top-plug.png',600,190,'The small end of a USB cable pointing towards the USB socket on a Raspberry Pi Pico.','Plug into the Pico.')}${setupFigure('plug-in-pico.png',600,486,'The other end of a USB cable pointing towards a USB port on a laptop.','Plug into the computer.')}</li>
    <li><h3>Tell Thonny where to run code</h3>${interpreterSteps}</li>
    <li><h3>Find the Shell</h3><p>Find the Shell’s <code>&gt;&gt;&gt;</code> prompt. Stop any running program first.</p></li>
   </ol>
   <div class="actions">${setupHelpButton('firmware','Try the MicroPython check')}${setupHelpButton('connection','My Pico will not connect')}</div>
   <p class="tiny">${link(docs.connection,'Thonny’s MicroPython guide')}</p>`},
  firmware:{title:'Check MicroPython on your Pico',intro:'Check that Python runs on your Pico.',body:`
   <h3>Try this before installing anything</h3><p>In Thonny’s Shell, type this and press Enter. Do not type <code>&gt;&gt;&gt;</code>.</p><pre><code>print("Hello Pico")</code></pre>
   <div class="callout"><strong>See “Hello Pico”?</strong> MicroPython works. Move on to picozero.</div>
   <p>No reply? Check the connection first: ${setupHelpButton('connection','Help with the connection')}</p>
   <h3>Only if MicroPython needs installing</h3>
   <div class="callout warning"><strong>Check for saved work.</strong> Ask before changing a shared Pico. Copy its files to your computer first. If you cannot, ask your leader before installing firmware.</div>
   <ol class="making-steps">
    <li><h3>Match the board</h3><p>Read the model printed on the board. Download the matching UF2 from ${link(docs.firmware,'Raspberry Pi')}.</p></li>
    <li><h3>Enter installation mode</h3><p>Unplug. Hold BOOTSEL while plugging in. Release when the <strong>RPI-RP2</strong> or <strong>RP2350</strong> drive appears.</p></li>
    <li><h3>Copy the firmware</h3><p>Copy the <code>.uf2</code> file onto the drive. Wait for the Pico to restart.</p></li>
    <li><h3>Reconnect and check</h3><p>In Thonny, select the Pico interpreter and try <code>print("Hello Pico")</code> again.</p></li>
   </ol>`},
  library:{title:'Install and try picozero',intro:'picozero helps you control your parts.',body:`
   <h3>Try the check first</h3><p>Run the check below. If it works, skip installation.</p>
   <h3>If picozero is missing</h3><ol class="making-steps">
    <li><h3>Open the package manager</h3><p>Select <strong>MicroPython (Raspberry Pi Pico)</strong>. Open <strong>Tools → Manage packages</strong>. Check that it says Raspberry Pi Pico.</p>${setupFigure('thonny-manage-packages.jpg',1101,788,'Thonny with Manage packages highlighted in the Tools menu.','Use the Tools menu at the top of Thonny, then choose Manage packages.')}</li>
    <li><h3>Search for picozero</h3><p>Search PyPI for <strong>picozero</strong>.</p>${setupFigure('thonny-packages-picozero.jpg',672,473,'The package manager for Raspberry Pi Pico with picozero in the search box.','Search in the package manager for your Pico. COM4 is an example port, not a port you need to copy.')}</li>
    <li><h3>Install onto your Pico</h3><p>Select <strong>picozero</strong>, choose <strong>Install</strong> and wait.</p>${setupFigure('thonny-install-package.jpg',668,470,'The picozero package information in Thonny with the Install button at the bottom.','Choose Install. The version number in this older screenshot may differ from the one you see.')}</li>
   </ol>
   <p>No package manager? Use the ${link(docs.library+'#manual-install','manual installation guide')}.</p>
   <h3>Run a short check</h3><p>Run this in Thonny. Save it as <code>check_pico.py</code>, not <code>picozero.py</code>.</p>
   <pre><code>${esc(checkCode)}</code></pre><div class="actions"><button class="btn" type="button" data-action="copy-setup">Copy setup check</button><button class="btn" type="button" data-action="download-setup">Download setup check</button></div>
   <div class="callout">Look for one second of LED light and the ready message.</div>
   <p>Keep your instrument file separate.</p>
   <div class="actions">${setupHelpButton('missing-library','Help with a picozero error')}</div><p class="tiny">${link(docs.library,'Full picozero installation guide')}</p>`},
  connection:{title:'My Pico will not connect',intro:'Try these in order. Stop when it connects.',body:`
   <ol class="making-steps">
    <li><h3>Check the cable</h3><p>Try a USB data cable and another port. A power light is not enough.</p></li>
    <li><h3>Check the interpreter</h3>${interpreterSteps}</li>
    <li><h3>Let Thonny use the connection</h3><p>Close other apps using the Pico. Press Thonny’s Stop button.</p></li>
    <li><h3>Look for installation mode</h3><p>See an RPI-RP2 or RP2350 drive? Reconnect without BOOTSEL.</p></li>
    <li><h3>Keep the error message</h3><p>Still stuck? Show your leader the error and board model. Do not erase a shared Pico just to try again.</p></li>
   </ol><div class="actions">${setupHelpButton('connect','Connection steps')}${setupHelpButton('firmware','Check MicroPython')}</div>
   <p class="tiny">${link(docs.connection,'Thonny connection reference')}</p>`},
  'missing-library':{title:'Help with a picozero error',intro:'Find out why picozero will not load.',body:`
   <h3>“No module named picozero”</h3><p>Select the Pico interpreter. picozero must be on the Pico, not just the computer.</p>
   <h3>Check your file names</h3><p>Call your test <code>check_pico.py</code>. If you named it <code>picozero.py</code>, rename your test before reinstalling.</p>
   <h3>Check again after installation</h3><p>Stop and rerun the check. If it still fails, show the error to your leader.</p>
   <div class="actions">${setupHelpButton('library','Open picozero installation steps')}${setupHelpButton('connect','Check the interpreter')}</div>
   <p class="tiny">${link(docs.library,'picozero setup reference')}</p>`}
 };
 const guide=Object.hasOwn(guides,topic)?guides[topic]:null;
 if(!guide)return '';
 return `<div class="dialog-head"><div><div class="eyebrow">Pico setup help</div><h2 id="setup-title" tabindex="-1" autofocus>${guide.title}</h2></div><button class="btn" type="button" data-action="close-setup" aria-label="Close setup help">Close ×</button></div><div class="dialog-body"><p class="setup-intro">${guide.intro}</p>${guide.body}${imageCredits[topic]?`<p class="tiny setup-image-credit">${imageCredits[topic]}</p>`:''}<p id="setup-status" role="status" aria-live="polite"></p><div class="setup-return"><button class="btn primary" type="button" data-action="close-setup">Back to Connect your Pico</button><p class="tiny">Help does not tick your Pico test.</p></div></div>`;
}
