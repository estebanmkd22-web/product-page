# Genera preview/paginas/arven-skin-h2.json: ARVEN Skin Defense · Hipótesis 2 (picazón, rozadura que avanza y zonas propensas a hongos).
# Base: la maqueta completa de preview/paginas/arven-fold.json. Sin promesas de cura: los hongos se nombran como riesgo.
import json
d = json.load(open('preview/paginas/arven-fold.json'))
AC, TX, TX2, F1, F2, SALVIA = '#2c4a35', '#1f2a22', '#5a645c', '#f5f3ee', '#e3e8df', '#8fa592'
def blk(t, **kw): return {"type": t, "settings": kw}
d['titulo'] = 'ARVEN Skin Defense · Hipótesis 2 (picazón y hongos)'
d['head_extra'] = "<link rel='stylesheet' href='https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700&display=swap'><style>:root{--pp-font-titulos:'Barlow Condensed',sans-serif;--pp-peso-titulos:700;--pp-espaciado-titulos:0}</style>"
d['producto'] = {"title": "ARVEN Skin Defense", "selected_or_first_available_variant": {"id": 1, "price": 8990000, "compare_at_price": 0, "available": True}, "media": []}
out = []
for s in d['secciones']:
    t = s['tipo']; st = s.setdefault('settings', {})
    if t == 'pp-estilos':
        st.update(acento=AC, texto=TX, texto_2=TX2, fondo=F1, fondo_2=F2, boton=AC, boton_texto='#ffffff', estrella='#c99a3b', ok='#4f7a52', radio=14)
    elif t == 'pp-logo':
        st.update(imagen={"src": "../../imagenes/arven/arven-logo.png", "alt": "ARVEN Body Comfort"}, ancho_movil=130, ancho_pc=160)
    elif t == 'pp-ticker':
        st.update(fondo=AC, texto='#ffffff')
        s['blocks'] = [blk('mensaje', texto=x) for x in ['Envío GRATIS a toda Colombia', 'Pagas al recibir', 'Te llega en 3 a 5 días', 'Garantía de satisfacción 60 días']]
    elif t == 'pp-hero-oferta':
        st.update(fondo=F1, titulo='Calma la picazón y <em>recupera la textura de la piel.</em>',
                  texto='Cuando la rozadura avanza pueden aparecer hongos. ARVEN Skin Defense mantiene seca y protegida la zona para que el problema no empeore.',
                  zonas_titulo='', zonas='')
        s['blocks'] = [blk('beneficio', texto=x) for x in [
          '<strong>Alivia la picazón y el enrojecimiento:</strong> calma la piel que ya está rozada e irritada.',
          '<strong>Controla la humedad:</strong> mantiene seca la zona donde el sudor y el calor hacen que la rozadura avance.',
          '<strong>Protege la piel:</strong> forma una barrera en las zonas propensas a la humedad y los hongos.',
          '<strong>Para hombres y mujeres:</strong> entrepierna, axilas y pliegues.']]
    elif t == 'pp-iconos':
        s['blocks'] = [blk('icono', icono='gota', texto='Controla la humedad'), blk('icono', icono='frescura', texto='Alivia la irritación'), blk('icono', icono='escudo', texto='Protege la piel')]
    elif t == 'pp-oferta-tabs':
        st.update(color_acento=AC, color_pestana=AC, titulo='Que la rozadura <em>no avance más</em>',
                  entrega='Te llega en 3 a 5 días · Envío gratis', etiquetas_titulo='Para zonas como',
                  etiquetas='Entrepierna, Axilas, Pliegues del abdomen, Debajo del busto')
        s['blocks'] = [
          blk('pack', pestana='1 crema', etiqueta='Para una zona', titulo='1 ARVEN Skin Defense', linea_regalo='🎁 Con los 4 beneficios incluidos', detalle='1 tubo de 100 g', precio=89900, precio_antes=0, cantidad=1),
          blk('pack', pestana='2 cremas', destacar='Más elegido', etiqueta='Para varias zonas', titulo='2 ARVEN Skin Defense', linea_regalo='🎁 Con los 4 beneficios incluidos', detalle='2 tubos de 100 g · $74.950 c/u', precio=149900, precio_antes=0, cantidad=2, preseleccionado=True),
          blk('regalo', insignia='Gratis', icono='camion', titulo='Envío gratis', texto='A toda Colombia'),
          blk('regalo', insignia='Incluido', icono='pago', titulo='Pagas al recibir', texto='Nada por adelantado'),
          blk('regalo', insignia='Gratis', icono='manual', titulo='Guía de cuidado', texto='Para la piel rozada'),
          blk('regalo', insignia='Incluido', icono='escudo', titulo='Garantía 60 días', texto='Si no te funciona, te devolvemos tu dinero')]
    elif t == 'pp-carrusel-imagenes':
        st.update(titulo='Un cuidado para <em>todos los días</em>', texto='Imágenes ilustrativas.')
        s['blocks'] = [blk('imagen') for _ in range(5)]
    elif t == 'pp-resultados-zona':
        st.update(color_acento=AC, etiqueta='Resultados', titulo='Del ardor <em>a la calma</em>', texto='Elige tu zona.')
        s['blocks'] = [
          blk('zona', zona='Entrepierna', titulo='Ya no me rasco', texto='La rozadura llevaba días picando y cada vez estaba más roja. Me la aplico en la mañana y la siento más calmada y seca.', nombre='Testimonio de ejemplo'),
          blk('zona', zona='Axilas', titulo='Menos ardor', texto='Con el sudor me ardía y se me ponía roja. Ahora la mantengo seca y la piel se siente más tranquila.', nombre='Testimonio de ejemplo'),
          blk('zona', zona='Abdomen', titulo='Piel más suave', texto='En el pliegue siempre había humedad y picazón. Desde que la uso, la piel se siente más suave y protegida.', nombre='Testimonio de ejemplo'),
          blk('zona', zona='Debajo del busto', titulo='Por fin tranquila', texto='El roce del brasier me dejaba roja y con picazón todo el día. Ahora la zona se mantiene seca y calmada.', nombre='Testimonio de ejemplo')]
    elif t == 'pp-grid-dolores':
        st.update(etiqueta='El problema', titulo='“Pensé que se quitaba sola. <em>Y empeoró.</em>”',
                  texto='Una rozadura que no se cuida sigue húmeda, caliente y rozando: el ambiente donde pueden aparecer los hongos.',
                  cierre='Una rozadura que avanza <em>no se arregla con talco.</em>')
        s['blocks'] = [
          blk('item', titulo='Picazón que no para', texto='Te rascas y la piel queda más irritada.'),
          blk('item', titulo='Enrojecimiento que crece', texto='Lo que era una línea roja se vuelve una mancha.'),
          blk('item', titulo='Piel que se pela', texto='El roce de cada día no la deja recuperarse.'),
          blk('item', titulo='Mal olor', texto='La humedad atrapada empeora todo.')]
    elif t == 'pp-galeria-ideas':
        st.update(color_fondo=F2, color_texto=TX, color_acento=AC, etiqueta='Dónde se usa',
                  titulo='Donde la rozadura avanza, <em>ARVEN protege</em>', texto='Un solo tubo para las zonas propensas a humedad y hongos.')
        s['blocks'] = [
          blk('idea', etiqueta='Entrepierna', titulo='Entrepierna', texto='Calma la picazón del roce al caminar.'),
          blk('idea', etiqueta='Axilas', titulo='Axilas', texto='Mantiene seca la zona que suda todo el día.'),
          blk('idea', etiqueta='Pliegues', titulo='Pliegues del abdomen', texto='Protege la piel donde se queda la humedad.'),
          blk('idea', etiqueta='Calor', titulo='Días de calor', texto='Cuando el sudor no da tregua.')]
    elif t == 'pp-timeline':
        st.update(color_tarjeta=AC, etiqueta='Cómo funciona', titulo='Tres cosas <em>en cada aplicación</em>', texto='Así trabaja ARVEN Skin Defense en la zona.')
        s['blocks'] = [
          blk('etapa', periodo='Al aplicarla', icono='frescura', titulo='Alivia la irritación', texto='Calma la picazón y el ardor de la piel rozada.'),
          blk('etapa', periodo='En minutos', icono='gota', titulo='Controla la humedad', texto='Deja la zona seca, sin el sudor atrapado que hace avanzar la rozadura.'),
          blk('etapa', periodo='Todo el día', icono='escudo', titulo='Protege la piel', texto='Una barrera para zonas propensas a la humedad y los hongos.')]
    elif t == 'pp-libre':
        st.update(color_texto=TX, color_fondo=F2)  # sellos de Fold Care: el usuario confirma cuáles aplican a Skin Defense
    elif t == 'pp-esperar':
        st.update(color_acento=AC, color_icono=SALVIA, titulo='Qué esperar <em>día a día</em>',
                  texto='Esto es lo que puedes esperar usándola a diario.')
        s['blocks'] = [
          blk('etapa', icono='reloj', periodo='Al aplicarla', texto='Se siente fresca y calma la picazón de la piel rozada.'),
          blk('etapa', icono='calendario', periodo='Día 1', texto='La zona se mantiene más seca y sientes menos ardor durante el día.'),
          blk('etapa', icono='calendario', periodo='Primeros días', texto='La piel se siente más tranquila y menos irritada.'),
          blk('etapa', icono='calendario', periodo='Semana 1', texto='Ya es parte de tu rutina: la zona seca y protegida.'),
          blk('etapa', icono='calendario', periodo='Uso continuo', texto='Mantén protegidas las zonas propensas a la humedad y los hongos.')]
    elif t == 'pp-problemas-filas':
        st.update(color_fondo=F2, color_tarjeta='#ffffff', color_acento=AC, color_dorado=SALVIA, color_texto=TX,
                  titulo='Lo que una rozadura', titulo_dorado='que avanza necesita', titulo_fin='', cierre='ARVEN Skin Defense hace las tres.')
        s['blocks'] = [
          blk('fila', icono='frescura', titulo='Calma', puntos='Alivia la picazón y el enrojecimiento para que dejes de rascarte.'),
          blk('fila', icono='gota', titulo='Sequedad', puntos='Controla la humedad que hace que la rozadura avance.'),
          blk('fila', icono='escudo', titulo='Protección', puntos='Una barrera en zonas propensas a la humedad y los hongos.')]
    elif t == 'pp-pasos':
        s['blocks'] = [blk('paso', titulo='Limpia y seca', texto='Lava la zona y sécala muy bien.'),
                       blk('paso', titulo='Aplica una capa fina', texto='Extiéndela sobre la zona rozada y alrededor.'),
                       blk('paso', titulo='Deja que se seque', texto='Vístete y sigue tu día.')]
    elif t == 'pp-comparativa':
        st.update(etiqueta='La diferencia', titulo='ARVEN vs. <em>lo que ya probaste</em>', texto='Frente al talco y las cremas comunes.',
                  color_destacado=AC, sub_a='Skin Defense', nombre_b='Talco o crema común', pie_der='Calma, seca y protege')
        s['blocks'] = [
          blk('fila', titulo='Picazón', subtitulo='Piel rozada', ok_a=True, valor_a='La alivia', ok_b=False, valor_b='Sigue igual'),
          blk('fila', titulo='Humedad', subtitulo='Durante el día', ok_a=True, valor_a='La controla', ok_b=False, valor_b='Se hace pasta'),
          blk('fila', titulo='Protección', subtitulo='Zonas propensas a hongos', ok_a=True, valor_a='Barrera', ok_b=False, valor_b='Poca o nada'),
          blk('fila', titulo='Para quién', subtitulo='Hombres y mujeres', ok_a=True, valor_a='Unisex', ok_b=False, valor_b='Depende')]
    elif t == 'pp-resenas':
        st.update(titulo='“Por fin se me <em>calmó la picazón.</em>”')
        s['blocks'] = [
          blk('resena', estrellas=5, titulo='Dejé de rascarme', texto='Tenía la entrepierna roja y con picazón hace días. Con ARVEN se calmó y la zona se mantiene seca.', nombre='Testimonio de ejemplo', ciudad='Barranquilla', verificado=False),
          blk('resena', estrellas=5, titulo='Mejor que el talco', texto='El talco se me hacía pasta y empeoraba. Esta deja la zona seca y la piel más suave.', nombre='Testimonio de ejemplo', ciudad='Cali', verificado=False),
          blk('resena', estrellas=5, titulo='Para los dos', texto='La usamos mi esposo y yo. A él en la entrepierna y a mí debajo del busto.', nombre='Testimonio de ejemplo', ciudad='Medellín', verificado=False)]
    elif t == 'pp-faq':
        s['blocks'] = [
          blk('pregunta', pregunta='Andrés de Cali pregunta: ¿esto cura los hongos?', respuesta='<p>No. ARVEN Skin Defense no es un medicamento ni un tratamiento para hongos. Es un cuidado diario para <strong>zonas propensas a la humedad y los hongos</strong>: alivia la irritación, controla la humedad y protege la piel. Si ya tienes una infección, consulta con tu médico.</p>'),
          blk('pregunta', pregunta='Diana de Bogotá pregunta: ¿la puedo usar si ya tengo la piel roja y con picazón?', respuesta='<p>Sí, está pensada para calmar la piel rozada e irritada. No la apliques sobre heridas abiertas, evita ojos y mucosas, y suspende su uso si notas molestia.</p>'),
          blk('pregunta', pregunta='Carlos de Medellín pregunta: ¿sirve para hombres y para mujeres?', respuesta='<p>Sí, es <strong>unisex</strong>: entrepierna, axilas y pliegues.</p>'),
          blk('pregunta', pregunta='Paola de Bucaramanga pregunta: ¿por qué no me sirve el talco?', respuesta='<p>Porque con el sudor se hace pasta y deja la humedad atrapada. ARVEN Skin Defense controla la humedad y protege la piel.</p>'),
          blk('pregunta', pregunta='Sandra de Ibagué pregunta: ¿cómo pago y cuándo me llega?', respuesta='<p>Pagas en efectivo cuando la recibes. Te llega en <strong>3 a 5 días</strong> y el envío es <strong>gratis a toda Colombia</strong>.</p>'),
          blk('pregunta', pregunta='Felipe de Santa Marta pregunta: ¿y si no me funciona?', respuesta='<p>Tienes <strong>garantía de satisfacción de 60 días</strong>: si no te funciona, te devolvemos tu dinero.</p>')]
    elif t == 'pp-garantia':
        st.update(color_tarjeta=AC, color_sello=AC, titulo='Tu piel más tranquila, o te devolvemos tu dinero',
                  texto='Pruébala 60 días. Si no te funciona, te devolvemos tu dinero. Envío gratis, te llega en 3 a 5 días y pagas al recibir.')
    elif t == 'pp-boton-fijo':
        st.update(precio_manual=149900)
    out.append(s)
d['secciones'] = out
json.dump(d, open('preview/paginas/arven-skin-h2.json', 'w'), ensure_ascii=False, indent=2)
print([s['tipo'] for s in out])
