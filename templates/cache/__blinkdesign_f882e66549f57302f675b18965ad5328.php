<?php

class __blinkdesign_f882e66549f57302f675b18965ad5328 extends Mustache_Template
{
    public function renderInternal(Mustache_Context $context, $indent = '', $escape = false)
    {
        $buffer = '';

        $buffer .= $indent . '<article class="excerpt';
        // 'has_image' section
        $buffer .= $this->sectionFda239b13edccfbc8649e9eb488d6bcb($context, $indent, $context->find('has_image'));
        $buffer .= '">';
        $buffer .= "\n";
        $buffer .= $indent . '    <header class="excerpt-title post-title">';
        $buffer .= "\n";
        $buffer .= $indent . '        <h1 class="hdr hdr-post excerpt-hdr"><a href="';
        $value = $context->find('url');
        if (!is_string($value) && is_callable($value)) {
            $value = $this->mustache
                ->loadLambda((string) call_user_func($value))
                ->renderInternal($context, $indent);
        }
        $buffer .= htmlspecialchars($value, ENT_COMPAT, 'UTF-8');
        $buffer .= '" class="ajax">';
        $value = $context->find('title');
        if (!is_string($value) && is_callable($value)) {
            $value = $this->mustache
                ->loadLambda((string) call_user_func($value))
                ->renderInternal($context, $indent);
        }
        $buffer .= $value;
        $buffer .= '</a></h1>';
        $buffer .= "\n";
        // 'has_date' section
        $buffer .= $this->section8d284077dea775cad06bc91251e70dea($context, $indent, $context->find('has_date'));
        $buffer .= $indent . '    </header>';
        $buffer .= "\n";
        $buffer .= $indent . '    <div class="excerpt-content">';
        $buffer .= "\n";
        $buffer .= $indent . '        <p>';
        $value = $context->find('excerpt');
        if (!is_string($value) && is_callable($value)) {
            $value = $this->mustache
                ->loadLambda((string) call_user_func($value))
                ->renderInternal($context, $indent);
        }
        $buffer .= $value;
        $buffer .= '</p>';
        $buffer .= "\n";
        // 'has_image' section
        $buffer .= $this->section5b65006e42b03b54f0ad6ccaba44264f($context, $indent, $context->find('has_image'));
        $buffer .= $indent . '    </div>';
        $buffer .= "\n";
        $buffer .= $indent . '</article>';
        $buffer .= "\n";

        if ($escape) {
            return htmlspecialchars($buffer, ENT_COMPAT, 'UTF-8');
        } else {
            return $buffer;
        }
    }

    private function sectionFda239b13edccfbc8649e9eb488d6bcb(Mustache_Context $context, $indent, $value) {
        $buffer = '';
        if (!is_string($value) && is_callable($value)) {
            $source = ' excerpt-work';
            $buffer .= $this->mustache
                ->loadLambda((string) call_user_func($value, $source))
                ->renderInternal($context, $indent);
        } elseif (!empty($value)) {
            $values = $this->isIterable($value) ? $value : array($value);
            foreach ($values as $value) {
                $context->push($value);
                $buffer .= ' excerpt-work';
                $context->pop();
            }
        }
    
        return $buffer;
    }

    private function section8d284077dea775cad06bc91251e70dea(Mustache_Context $context, $indent, $value) {
        $buffer = '';
        if (!is_string($value) && is_callable($value)) {
            $source = '
            <time class="post-date" datetime="{{w3c_date}}">{{date}}</time>
        ';
            $buffer .= $this->mustache
                ->loadLambda((string) call_user_func($value, $source))
                ->renderInternal($context, $indent);
        } elseif (!empty($value)) {
            $values = $this->isIterable($value) ? $value : array($value);
            foreach ($values as $value) {
                $context->push($value);
                $buffer .= $indent . '            <time class="post-date" datetime="';
                $value = $context->find('w3c_date');
                if (!is_string($value) && is_callable($value)) {
                    $value = $this->mustache
                        ->loadLambda((string) call_user_func($value))
                        ->renderInternal($context, $indent);
                }
                $buffer .= htmlspecialchars($value, ENT_COMPAT, 'UTF-8');
                $buffer .= '">';
                $value = $context->find('date');
                if (!is_string($value) && is_callable($value)) {
                    $value = $this->mustache
                        ->loadLambda((string) call_user_func($value))
                        ->renderInternal($context, $indent);
                }
                $buffer .= htmlspecialchars($value, ENT_COMPAT, 'UTF-8');
                $buffer .= '</time>';
                $buffer .= "\n";
                $context->pop();
            }
        }
    
        return $buffer;
    }

    private function section5b65006e42b03b54f0ad6ccaba44264f(Mustache_Context $context, $indent, $value) {
        $buffer = '';
        if (!is_string($value) && is_callable($value)) {
            $source = '
            <a href="{{url}}" class="work-img work-img-mini">{{{image}}}</a>
        ';
            $buffer .= $this->mustache
                ->loadLambda((string) call_user_func($value, $source))
                ->renderInternal($context, $indent);
        } elseif (!empty($value)) {
            $values = $this->isIterable($value) ? $value : array($value);
            foreach ($values as $value) {
                $context->push($value);
                $buffer .= $indent . '            <a href="';
                $value = $context->find('url');
                if (!is_string($value) && is_callable($value)) {
                    $value = $this->mustache
                        ->loadLambda((string) call_user_func($value))
                        ->renderInternal($context, $indent);
                }
                $buffer .= htmlspecialchars($value, ENT_COMPAT, 'UTF-8');
                $buffer .= '" class="work-img work-img-mini">';
                $value = $context->find('image');
                if (!is_string($value) && is_callable($value)) {
                    $value = $this->mustache
                        ->loadLambda((string) call_user_func($value))
                        ->renderInternal($context, $indent);
                }
                $buffer .= $value;
                $buffer .= '</a>';
                $buffer .= "\n";
                $context->pop();
            }
        }
    
        return $buffer;
    }
}